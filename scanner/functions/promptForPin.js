function promptForPin() {
  if (!EVALEX_TRUSTED) {
    const encodedSecret = encodeURIComponent(SECRET);
    fetch(
      `${document.location.pathname}?__debugger__=yes&cmd=printpin&s=${encodedSecret}`
    );
    const pinPrompt = document.getElementsByClassName("pin-prompt")[0];
    fadeIn(pinPrompt);
    document.querySelector('.pin-prompt input[name="pin"]').focus();
  }
}