function PythonEnabled() {
  if (PYTHON_ENABLED === null) {
    const disabled = vscode.workspace.getConfiguration('kite').completions.disabledFileExtensions;
    PYTHON_ENABLED = !disabled.includes('.py');
  }
  return PYTHON_ENABLED;
}