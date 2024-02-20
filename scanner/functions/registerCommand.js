function registerCommand(target, commandName, callback) {
  if (commandName) {
    if (typeof callback === 'function') {
      target[commandName] = callback;
    } else {
      console.error(`The command must be registered as a function: ${commandName}`);
    }
  } else {
    console.error('Command name is required');
  }
}