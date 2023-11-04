console.log("background page ...");

chrome.contextMenus.create({
  id: "PesoPulse",
  title: "Add to my expenses",
  contexts: ["selection"],
});

chrome.storage.sync.set({ expensesList: [] });
chrome.storage.sync.set({ remainingFunds: 0 });

let funds = 0;
async function fetchFunds() {
  try {
    const response = await chrome.storage.sync.get("remainingFunds");
    if (response && response.remainingFunds !== undefined) {
      console.log(response);
      funds = response.remainingFunds;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be handled by the calling code
  }
}

fetchFunds();

let removeCharacter = (selectedString) => {
  return selectedString.replace(/[^0-9]/g, "");
};

chrome.contextMenus.onClicked.addListener((clickData, tab) => {
  console.log("clickData", clickData, tab, funds);
  if (clickData.menuItemId === "PesoPulse" && clickData.selectionText) {
    if (
      removeCharacter(clickData.selectionText) &&
      funds > removeCharacter(clickData.selectionText)
    ) {
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
