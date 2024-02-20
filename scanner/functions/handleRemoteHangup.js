function handleRemoteHangup() {
  console.log('Session terminated.');
  stop();
  isInitiator = false;
}