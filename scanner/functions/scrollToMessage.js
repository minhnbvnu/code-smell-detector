function scrollToMessage() {
    $timeout(function () {
      $("#container").scrollTop($("#container")[0].scrollHeight);
    }, 100);
  }