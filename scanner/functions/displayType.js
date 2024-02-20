function displayType(msgType, args) {
  let display = true;
  if (args.type && args.type.toLowerCase() !== msgType.toLowerCase()) {
    display = false;
  }

  return display;
}