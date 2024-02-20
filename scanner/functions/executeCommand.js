function executeCommand (editor, commandName, params) {
  editor.send('executeCommand', commandName, params)
}