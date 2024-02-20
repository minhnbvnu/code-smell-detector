function disconnected() {
  console.log('Control socket closed');
  $("#feedbackSidebar .interactive").addClass("disabled");
  $("img#disconnected").show();

  setTimeout(function() { reconnectControlChannel() } , 5000);
}