(function () {
  let total = 0;
  $(document).ready(function () {
    // write code here

    chrome.storage.sync.set(
      {
        expensesList: [
          { id: 1, price: "200", name: "Testing Name" },
          { id: 1, price: "300", name: "Testing Name 2" },
        ],
      },
      function () {}
    );

    chrome.storage.sync.get(["expensesList"], function (data) {
      console.log("popup data", data);
      if (data.expensesList.length > 0) {
        console.log("approved");
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
      }
    });

    chrome.storage.sync.set({
      totalExpenses: total,
    });
  });
})();
