(function () {
  let total = 0;
  let funds = 0;
  $(document).ready(function () {
    // write code here

    chrome.storage.sync.get(["expensesList", "remainingFunds"], function (data) {
      console.log("popup data", data);
      if (data.expensesList.length > 0) {
        console.log("approved");
        $("#down-icon").fadeIn();
        $(".spend-content").fadeIn();
        data.expensesList.map((expense) => {
          $("#spendList").append(`<li class="list-group-item">
            <span class="item-list">
              <span>${expense.name}</span>
              <span>${expense.price}</span>
            </span>
          </li>`);
          total += parseInt(expense.price);
          $("#spend").text(`${total}`);
        });
      } else {
        console.log("no data as of this moment");
      }
      $("#spend").text(`${total}`);
      $("#funds").text(`${funds}`);
    });

    chrome.storage.sync.set({
      totalExpenses: total,
    });

    $("#down-icon").click(function () {
      $(".spend-content").fadeToggle();
    });
  });
})();
