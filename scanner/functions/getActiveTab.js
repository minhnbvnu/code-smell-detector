async function getActiveTab () {
  const [activeTab] = await browser.tabs.query({currentWindow: true, active: true});
  return activeTab;
}