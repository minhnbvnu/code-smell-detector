function createInteractiveConsole() {
  const target = document.querySelector("div.console div.inner");
  while (target.firstChild) {
    target.removeChild(target.firstChild);
  }
  openShell(null, target, 0);
}