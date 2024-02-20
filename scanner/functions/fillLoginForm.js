function fillLoginForm(login, tab, autoSubmit) {
  const loginParam = JSON.stringify(login);
  chrome.tabs.executeScript(
    tab.id,
    {
      allFrames: true,
      file: "/inject.js"
    },
    function() {
      chrome.tabs.executeScript({
        allFrames: true,
        code: `browserpassFillForm(${loginParam}, ${autoSubmit});`
      });
    }
  );

  if (login.digits) {
    tabInfos[tab.id] = {
      login: loginParam,
      hostname: getHostname(tab.url)
    };
    displayOTP(tab.id);
  }
}