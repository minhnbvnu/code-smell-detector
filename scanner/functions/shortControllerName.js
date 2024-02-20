function shortControllerName(controller) {
  let name = cleanupInstanceName(controllerName(controller));
  let match = name.match(/^\(generated (.+) controller\)/);
  if (match) {
    return match[1];
  }
  return name;
}