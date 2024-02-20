function handleHangUpMsg(msg) {
  log("*** Received hang up notification from other peer");

  closeVideoCall();
}