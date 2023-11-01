console.log("background page ...")

chrome.contextMenus.create({
    id: "PesoPulse",
    title: "Add to my expenses",
    contexts: ["selection"]
});