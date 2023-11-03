(function () {
  $(document).ready(function () {
    let selectedPrice;
    let currentExpenseList;

    chrome.storage.sync.get(
      ["newSelectionPrice", "tabSelectionId", "expensesList"],
      function (data) {
        const newSelection = data.newSelectionPrice;
        const tabSelection = data.tabSelectionId;

        currentExpenseList = data.expensesList ? data.expensesList : [];

        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            console.log("modal", tabs);
            console.log("tabSelection", tabSelection);
            if (newSelection && tabSelection === tabs[0].id) {
              selectedPrice = newSelection;
              $("#myModal").fadeIn();
            } else {
              close();
            }
          }
        );
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

    $("#add").click(function () {
      let expenseName = $("#content-form").val();
      let newExpenseList = [
        ...currentExpenseList,
        { price: selectedPrice, expenseName },
      ];
      console.log("newExpenseList", newExpenseList);
      chrome.storage.sync.set({
        expensesList: newExpenseList,
        tabSelectionId: null,
      });
      $("#myModal").fadeOut(function () {
        setTimeout(function () {
          close();
        }, 1000);
      });
    });
  });
})();
