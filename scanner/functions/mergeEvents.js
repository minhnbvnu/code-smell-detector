function mergeEvents(maps, events, listen) {
  Object.keys(events).forEach(function (type) {
    maps[type] = listen(combo(events[type]));
  });
}