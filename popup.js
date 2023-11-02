$(document).ready(function () {
  chrome.storage.sync.get(
    ["newSelectionPrice", "tabSelectionId"],
    function (newSelection, tabSelection) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (newSelection && !tabs[0].url) {
          $("#myModal").fadeIn();
        } else {
          console.log("Current tab title: " + tabs[0].title);
          console.log("Current tab URL: " + tabs[0].url);
          console.log("Current tab: " + tabs[0].id);
        }
      });
    }
  );

  $("p").click(function () {
    $(this).hide();
  });
  $("#openModal").click(function () {
    $("#myModal").fadeIn();
  });

  $(".close").click(function () {
    $("#myModal").fadeOut();
  });
  $(window).click(function (event) {
    if (event.target == $("#myModal")[0]) {
      $("#myModal").css("display", "none");
    }
  });
});
