function onConfigUnload() {
  if (
    document.getElementById("configDeck").getAttribute("selectedIndex") == 1
  ) {
    gPrefBranch.removeObserver("", gPrefListener);
    var configTree = document.getElementById("configTree");
    configTree.view = null;
    configTree.controllers.removeController(configController);
  }
}