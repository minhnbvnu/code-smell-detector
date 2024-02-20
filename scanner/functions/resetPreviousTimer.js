function resetPreviousTimer(newMessage) {
    previousMessage = newMessage;
    clearTimeout(previousMessageTimer);
    previousMessageTimer = setTimeout(function(){previousMessage = false;}, previousMessageTimeoutMS);
  }