function FilterPrefs() {
  if (
    document.getElementById("configDeck").getAttribute("selectedIndex") != 1
  ) {
    return;
  }

  var substring = document.getElementById("textbox").value;
  // Check for "/regex/[i]"
  if (substring.charAt(0) == "/") {
    var r = substring.match(/^\/(.*)\/(i?)$/);
    try {
      gFilter = RegExp(r[1], r[2]);
    } catch (e) {
      return; // Do nothing on incomplete or bad RegExp
    }
  } else if (substring) {
    gFilter = RegExp(
      substring
        .replace(/([^* \w])/g, "\\$1")
        .replace(/^\*+/, "")
        .replace(/\*+/g, ".*"),
      "i"
    );
  } else {
    gFilter = null;
  }

  var prefCol =
    view.selection && view.selection.currentIndex < 0
      ? null
      : gPrefView[view.selection.currentIndex].prefCol;
  var oldlen = gPrefView.length;
  gPrefView = gPrefArray;
  if (gFilter) {
    gPrefView = [];
    for (var i = 0; i < gPrefArray.length; ++i) {
      if (gFilter.test(gPrefArray[i].prefCol + ";" + gPrefArray[i].valueCol)) {
        gPrefView.push(gPrefArray[i]);
      }
    }
  }
  view.treebox.invalidate();
  view.treebox.rowCountChanged(oldlen, gPrefView.length - oldlen);
  gotoPref(prefCol);
}