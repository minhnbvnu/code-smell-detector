function offPointer(direction) {
  let eventName = direction[0].toUpperCase() + direction.substr(1);
  callbacks['on' + eventName] = 0;
}