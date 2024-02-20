async function checkIfTrackersAreDetected(sender) {
  const activeTab = await getActiveTab();
  const tabState = tabStates[activeTab.id];
  const trackersDetected = (tabState && tabState.trackersDetected);
  const onActiveTab = (activeTab.id === sender.tab.id);
  // Check if trackers were blocked,scoped to the active tab.
  return (onActiveTab && trackersDetected);  
}