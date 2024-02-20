function onPointer(direction, callback) {
  let eventName = direction[0].toUpperCase() + direction.substr(1);
  callbacks['on' + eventName] = callback;
}