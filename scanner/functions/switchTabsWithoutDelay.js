function switchTabsWithoutDelay(tabid) {
  skipTabOrderUpdateTimer = tabid;
  switchTabs(tabid)
}