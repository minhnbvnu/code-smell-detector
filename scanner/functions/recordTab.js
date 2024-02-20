function recordTab(tab) {
  if (includeTab(tab)) {
    log('recording tab', tab.id);
    tabs.push(tab);
  }
}