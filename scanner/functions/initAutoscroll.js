function initAutoscroll() {
  var isScrolledToBottom = false;

  var container = document.querySelector('.textbox-container');
  var textbox = document.querySelector('#textbox');

  // update isScrolledToBottom on scroll event (true within 50px of the bottom of container)
  container.addEventListener('scroll', function() {
    isScrolledToBottom = container.scrollHeight - container.clientHeight - container.scrollTop <= 50;
  });

  // scroll to bottom on the input event, if isScrolledToBottom is true
  textbox.addEventListener('input', function() {
    if(isScrolledToBottom) {
      container.scrollTop = container.scrollHeight;
    }
  });
}