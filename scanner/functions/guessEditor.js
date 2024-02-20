function guessEditor() {
  // Explicit config always wins
  if (process.env.REACT_EDITOR) {
    return process.env.REACT_EDITOR;
  }

  // Using `ps x` on OSX we can find out which editor is currently running.
  // Potentially we could use similar technique for Windows and Linux
  if (process.platform === 'darwin') {
    try {
      var output = child_process.execSync('ps x').toString();
      var processNames = Object.keys(COMMON_EDITORS);
      for (var i = 0; i < processNames.length; i++) {
        var processName = processNames[i];
        if (output.indexOf(processName) !== -1) {
          return COMMON_EDITORS[processName];
        }
      }
    } catch(error) {
      // Ignore...
    }
  }

  // Last resort, use old skool env vars
  return process.env.VISUAL || process.env.EDITOR;
}