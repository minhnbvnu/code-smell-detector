function hangup() {
  console.log('Hanging up.');
  stop();
  sendMessage('bye');
}