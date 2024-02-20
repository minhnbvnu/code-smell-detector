function onReadyStateChange() {
        if (!connected && req.readyState > 1) onConnect();
      }