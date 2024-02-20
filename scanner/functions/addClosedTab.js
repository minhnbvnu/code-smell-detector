function addClosedTab(tab) {
  if (isWebUrl(tab.url)) {
    //    log("adding tab " + tab.id + " to closedTabs array " + tab.url);
    closedTabs.unshift({url: tab.url, title: tab.title, favIconUrl: tab.favIconUrl});
    saveClosedTabs();
  }
  resizeClosedTabs();
}