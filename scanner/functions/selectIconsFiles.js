function selectIconsFiles() {

  const panel = NSOpenPanel.openPanel();
  panel.setAllowsMultipleSelection(true);
  panel.setCanChooseDirectories(true);
  panel.setAllowedFileTypes(AVAILABLE_EXT);
  panel.setCanChooseFiles(true);
  panel.setPrompt("Select");

  if (panel.runModal() !== NSFileHandlingPanelOKButton) return []

  const result = []

  getFilesByUrls(panel.URLs(), result)

  return result
}