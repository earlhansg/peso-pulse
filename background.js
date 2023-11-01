console.log("background page ...")

chrome.contextMenus.create({
    id: "PesoPulse",
    title: "Add to my expenses",
    contexts: ["selection"]
});

let removeCharacter = (selectedString) => {
    return selectedString.replace(/[^0-9]/g, '');
}

chrome.contextMenus.onClicked.addListener((clickData) => {
    console.log("clickData", clickData)
    if(clickData.menuItemId === "PesoPulse" && clickData.selectionText) {
        if(removeCharacter(clickData.selectionText)) {
            console.log("theres is a number");
        }
    }
})