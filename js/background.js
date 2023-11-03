console.log("background page ...");

chrome.contextMenus.create({
  id: "PesoPulse",
  title: "Add to my expenses",
  contexts: ["selection"],
});

chrome.storage.sync.set({"expensesList": []});

let removeCharacter = (selectedString) => {
  return selectedString.replace(/[^0-9]/g, "");
};

chrome.contextMenus.onClicked.addListener((clickData, tab) => {
  console.log("clickData", clickData, tab);
  if (clickData.menuItemId === "PesoPulse" && clickData.selectionText) {
    if (removeCharacter(clickData.selectionText)) {
      chrome.storage.sync.set({'newSelectionPrice': removeCharacter(clickData.selectionText)})
      chrome.tabs.create({ url: "../html/modal.html" }, (tab) => {
        console.log("Created a new tab with ID: " + tab.id);
        chrome.storage.sync.set({'tabSelectionId': tab.id})
      });
    }
  }
});
