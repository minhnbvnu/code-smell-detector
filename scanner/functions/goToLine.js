function goToLine (line, col) {
	sourceEditor.focus();
  sourceEditor.setCursor({line: line - 1, ch: col});
}