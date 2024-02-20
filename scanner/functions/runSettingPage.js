function runSettingPage() {
  if (GM?.info?.script?.grant?.includes("unsafeWindow")) {
    unsafeWindow.GM = GM;
    unsafeWindow.APP_INFO = {
      name: process.env.REACT_APP_NAME,
      version: process.env.REACT_APP_VERSION,
    };
  } else {
    const ping = genEventName();
    window.addEventListener(ping, handlePing);
    // window.eval(`(${injectScript})("${ping}")`); // eslint-disable-line
    const script = document.createElement("script");
    script.textContent = `(${injectScript})("${ping}")`;
    document.head.append(script);
  }
}