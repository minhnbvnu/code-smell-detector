function launchEditor(fileName, lineNumber) {
  if (!fs.existsSync(fileName)) {
    return;
  }

  // Sanitize lineNumber to prevent malicious use on win32
  // via: https://github.com/nodejs/node/blob/c3bb4b1aa5e907d489619fb43d233c3336bfc03d/lib/child_process.js#L333
  if (lineNumber && isNaN(lineNumber)) {
    return;
  }

  var editor = guessEditor();
  if (!editor) {
    printInstructions('PRO TIP');
    return;
  }

  var args = [fileName];
  if (lineNumber) {
    args = getArgumentsForLineNumber(editor, fileName, lineNumber);
  }
  console.log('Opening ' + chalk.underline(fileName) + ' with ' + chalk.bold(editor));

  if (_childProcess && isTerminalEditor(editor)) {
    // There's an existing editor process already and it's attached
    // to the terminal, so go kill it. Otherwise two separate editor
    // instances attach to the stdin/stdout which gets confusing.
    _childProcess.kill('SIGKILL');
  }

  if (process.platform === 'win32') {
    // On Windows, launch the editor in a shell because spawn can only
    // launch .exe files.
    _childProcess = child_process.spawn('cmd.exe', ['/C', editor].concat(args), {stdio: 'inherit'});
  } else {
    _childProcess = child_process.spawn(editor, args, {stdio: 'inherit'});
  }
  _childProcess.on('exit', function(errorCode) {
    _childProcess = null;

    if (errorCode) {
      console.log(chalk.red('Your editor exited with an error!'));
      printInstructions('Keep these instructions in mind:');
    }
  });

  _childProcess.on('error', function(error) {
    console.log(chalk.red(error.message));
    printInstructions('How to fix:');
  });
}