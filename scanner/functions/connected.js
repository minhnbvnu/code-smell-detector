function connected() {
  console.log('Control socket opened');
  $("#feedbackSidebar .interactive").removeClass("disabled");
  $("img#disconnected").hide();

  try {
    // If we are a presenter, then remind the server who we are
    register();
  }
  catch (e) {}
}