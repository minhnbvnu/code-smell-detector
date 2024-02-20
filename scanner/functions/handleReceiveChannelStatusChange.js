function handleReceiveChannelStatusChange(event) {
    if (receiveChannel) {
      console.log("Receive channel's status has changed to " +
                  receiveChannel.readyState);
    }
    
    // Here you would do stuff that needs to be done
    // when the channel's status changes.
  }