function receiverExitWithError() {
      console.log('No messages received in the past ' + RECEIVER_TIMEOUT_DELAY + ' ms, exiting test');
      process.exit(1);
   }