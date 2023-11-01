$(document).ready(function () {
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
