function findStatusBar() {
  if (typeof atom.workspace.getFooterPanels === 'function') {
    const footerPanels = atom.workspace.getFooterPanels();
    if (footerPanels.length > 0) {
      return footerPanels[0].getItem();
    }
  }

  return atom.workspace.getBottomPanels()[0].getItem();
}