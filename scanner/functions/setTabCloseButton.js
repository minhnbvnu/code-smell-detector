function setTabCloseButton(tabCloseButton) {
  if (tabCloseButton === 'Left') {
    root.setAttribute(`theme-${themeName}-tab-close-button`, 'left');
  } else {
    unsetTabCloseButton();
  }
}