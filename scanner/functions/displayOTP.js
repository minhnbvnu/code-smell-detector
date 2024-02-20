function displayOTP(tabId) {
  chrome.tabs.executeScript(
    tabId,
    {
      file: "/inject_otp.js"
    },
    function() {
      chrome.tabs.executeScript(tabId, {
        code: `browserpassDisplayOTP(${tabInfos[tabId].login});`
      });
    }
  );
}