function postMessageListeners(iframeSrcVal, target){

  window.addEventListener("message", (e) => {
    if (
      e.data === "allowTriggered" 
      && iframeSrcVal.includes(e.origin)
    ){
      target.click();
    }
  });

  window.addEventListener("message", (e) => {
    if (
      e.data === "closeTheInjectedIframe" 
      && iframeSrcVal.includes(e.origin)
    ) {
      closeIframe();
    }
  });

  window.addEventListener("message", (e) => {
    if (
      e.data === "checkboxTicked" 
      && iframeSrcVal.includes(e.origin)
      && localStorageAvailable()
    ) {

      setLocalStorageTickedCheckBox();
    }
  });
}