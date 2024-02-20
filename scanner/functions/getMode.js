function getMode() {
      var mode = (simulStreaming && (currentStreamState != streamState.SNAPSHOT) && (currentStreamState != streamState.STOPPED)) ? 'jpeg' : 'single';
      //console.log("mode="+mode + " due to simulStreaming:"+simulStreaming+" currentStreamState==SNAPSHOT?"+((currentStreamState != streamState.SNAPSHOT)+ " or Stopped?"+(currentStreamState != streamState.STOPPED)));
      return mode;
    }