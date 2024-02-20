function featureSetPath() {
  return fs.existsSync(jsonPath('tests/vscode.json'))
    ? jsonPath('tests/vscode.json')
    : jsonPath('tests/default.json');
}