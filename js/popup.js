(function () {
  let total = 0;
  let funds = 0;
  $(document).ready(function () {
    // write code here
    console.log("popup.js");

    chrome.storage.sync.get(
      ["expensesList", "remainingFunds", "totalExpenses"],
      function (data) {
        console.log("popup data", data);

        funds += parseInt(data.remainingFunds, 10);

        if (data.expensesList.length > 0) {
          $("#down-icon").fadeIn();
          $(".spend-content").fadeIn();

          data.expensesList.forEach((expense) => {
            $("#spendList").append(`
            <li class="list-group-item">
              <span class="item-list">
                <span>${expense.name}</span>
                <span>${expense.price}</span>
              </span>
            </li>`);
            total += parseInt(expense.price, 10);
          });
        } else {
          console.log("No data at this moment");
        }

        console.log("total", total);
        $("#spend").text(`${total}`);
        $("#funds").text(`${funds}`);
      }
    );

    chrome.storage.sync.set({ totalExpenses: total });

    $("#down-icon").click(function () {
      $(".spend-content").fadeToggle();
    });

    // Define a function to update funds and store data in Chrome storage
    function updateFunds(inputValue, callback) {
      funds += parseInt(inputValue, 10);
      $("#funds").text(`${funds}`);
      // chrome.storage.sync.set({ remainingFunds: funds }, callback);
      chrome.runtime.sendMessage(
        { command: "AddFunds", value: inputValue },
        callback
      );
      $("#budget-input").val("");
    }

    // Attach a click event handler to the button
    $("#budget-btn").click(function () {
      const inputValue = $("#budget-input").val();

      if (inputValue) {
        // updateFunds(inputValue, function (response) {
        //   $("#budget-input").val("");
        // });
        updateFunds(inputValue);
      }
    });
  });
})();
