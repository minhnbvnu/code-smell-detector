function toggleMobileTree(should_display) {
  if (should_display === undefined) {
    should_display = !$('#tree').hasClass('in');
  }
  $('#tree').toggleClass('in', should_display);
}