function refreshTargetTabs() {
    browser.runtime.sendMessage({ from: "popup", operate: "refreshTargetTabs"});
}