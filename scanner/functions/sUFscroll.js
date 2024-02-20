function sUFscroll (event) {
    // Compute paths
    let url = gBrowser.currentURI;
    if (url)
      var currentTab = processPaths(url.spec);
    else
      return;
    // Stop event propagation (for other addon compatibility as Xclear)
    event.stopPropagation();
    // Go up in paths list
    let goUp = event.detail < 0;
    if (goUp && currentTab.SUFPointer < currentTab.SUFPaths.length - 1) {
      // Update curent pointer
      currentTab.SUFPointer++;
    }
    // Go down in paths list
    else if (!goUp && currentTab.SUFPointer > 0) {
      // Update curent pointer
      currentTab.SUFPointer--;
    }
    // Display the path to the urlbar URL
    if (UrlbarPrefs.get('trimURLs') && gURLBar.valueFormatter._getUrlMetaData().schemeWSlashes == 'http://') {
      gURLBar.value = gURLBar.trimValue(currentTab.SUFPaths[currentTab.SUFPointer]);
      gURLBar._untrimmedValue = 'http://' + gURLBar.value;
    } else {
      gURLBar.value = currentTab.SUFPaths[currentTab.SUFPointer];
    }
    let urlength = gURLBar.value.length;
    gURLBar.focus();
    gURLBar.inputField.setSelectionRange(urlength, urlength);
  }