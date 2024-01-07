function setStickyHeaders(stickyHeaders) {
  if (stickyHeaders) {
    root.setAttribute(`theme-${themeName}-sticky-headers`, 'sticky');
  } else {
    unsetStickyHeaders();
  }
}