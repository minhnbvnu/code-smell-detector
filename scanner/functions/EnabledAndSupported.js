function EnabledAndSupported() {
  if (ENABLED_AND_SUPPORTED === null) {
    const disabled = vscode.workspace.getConfiguration('kite').completions.disabledFileExtensions;
    const enabled = SupportedExtensions().filter(ext => !disabled.includes(ext));
    ENABLED_AND_SUPPORTED = enabled;
  }
  return ENABLED_AND_SUPPORTED;
}