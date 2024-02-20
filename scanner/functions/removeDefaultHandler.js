function removeDefaultHandler(stream, event) {
  var found = false;
  stream.listeners(event).forEach(function (item) {
    if (item.name === 'on' + event) {
      found = item;
      this.removeListener(event, item);
    }
  }, stream);
  return found;
}