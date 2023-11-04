console.log("background page ...");

chrome.contextMenus.create({
  id: "PesoPulse",
  title: "Add to my expenses",
  contexts: ["selection"],
});

console.log("checking");

chrome.storage.sync.set({ expensesList: [] });
// chrome.storage.sync.set({ remainingFunds: 0 });
// chrome.storage.sync.remove('remainingFunds');
// chrome.storage.sync.set({totalExpenses: 0});

let funds = 0;
async function fetchFunds() {
  try {
    const response = await chrome.storage.sync.get("remainingFunds");
    if (response && response.remainingFunds !== undefined) {
      funds = response.remainingFunds;
      console.log("if", funds);
    } else {
      chrome.storage.sync.set({ remainingFunds: 0 });
    }
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be handled by the calling code
  }
}

fetchFunds();

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.command === "AddFunds") {
    funds += parseInt(msg.value, 10);
    chrome.storage.sync.set({ remainingFunds: funds });
  }
  if (msg.command === "UpdatedFunds") {
    console.log("Add listen to this UpdatedFunds");
    chrome.storage.sync.get("totalExpenses", function (data) {
      funds -= parseInt(data.totalExpenses, 10);
      chrome.storage.sync.set({ remainingFunds: funds });
    });
  }
  console.log('remaining funds', funds)
});


let removeCharacter = (selectedString) => {
  return selectedString.replace(/[^0-9]/g, "");
};

chrome.contextMenus.onClicked.addListener(async function (clickData, tab) {
  console.log("remaining funds", funds);
  if (clickData.menuItemId === "PesoPulse" && clickData.selectionText) {
    if (funds > removeCharacter(clickData.selectionText)) {
      chrome.storage.sync.set({
        newSelectionPrice: removeCharacter(clickData.selectionText),
      });
      chrome.tabs.create({ url: "../html/modal.html" }, (tab) => {
        console.log("Created a new tab with ID: " + tab.id);
        chrome.storage.sync.set({ tabSelectionId: tab.id });
      });
    } else {
      console.log("insufficient funds");
      let notifOptions = {
        type: "basic",
        iconUrl: "../images/icon32.png",
        title: "Insufficient Fund",
        message: "Uh Oh! Looks like youve reached your limit!",
      };
      chrome.notifications.create("limitNotif", notifOptions);
      setTimeout(function () {
        chrome.notifications.clear("limitNotif", function (data) {});
      }, 2000);
    }
  }
});
