$(function() {
  const $value = $("#value");
  const $resultBox = $("#resultBox");
  const $resultGmt = $("#resultGmt");
  const $resultNow = $("#resultNow");

  const now = function () { return Math.floor(new Date() / 1000) };

  $value.val(now);

  $('#btnGenerate').on('click', function() {
    const date = new Date($value.val() * 1000);
    $resultGmt.text(date.toUTCString());
    $resultNow.text(date.toString());
    $resultBox.show();
  });

  $("#btnClear").on('click', function() {
    $value.val(now);
    $resultBox.hide();
  });
});