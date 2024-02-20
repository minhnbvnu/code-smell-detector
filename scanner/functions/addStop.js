function addStop(event) {
    if (!event.stop) event.stop = stopMethod;
    return event;
  }