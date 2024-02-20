function ShowPrefs() {
  document.getElementById('configDeck').lastElementChild.style.visibility = 'visible';
  gPrefBranch.getChildList("").forEach(fetchPref);

  var descending = document.getElementsByAttribute(
    "sortDirection",
    "descending"
  );
  if (descending.item(0)) {
    gSortedColumn = descending[0].id;
    gSortDirection = -1;
  } else {
    var ascending = document.getElementsByAttribute(
      "sortDirection",
      "ascending"
    );
    if (ascending.item(0)) {
      gSortedColumn = ascending[0].id;
    } else {
      document
        .getElementById(gSortedColumn)
        .setAttribute("sortDirection", "ascending");
    }
  }
  gSortFunction = gSortFunctions[gSortedColumn];
  gPrefArray.sort(gSortFunction);

  gPrefBranch.addObserver("", gPrefListener);

  var configTree = document.getElementById("configTree");
  configTree.view = view;
  configTree.controllers.insertControllerAt(0, configController);

  document.getElementById("configDeck").setAttribute("selectedIndex", 1);
  document.getElementById("configTreeKeyset").removeAttribute("disabled");
  if (!document.getElementById("showWarningNextTime").checked) {
    gPrefBranch.setBoolPref("general.warnOnAboutConfig", false);
  }

  // Process about:config?filter=<string>
  var textbox = document.getElementById("textbox");
  // About URIs don't support query params, so do this manually
  var loc = document.location.href;
  var matches = /[?&]filter\=([^&]+)/i.exec(loc);
  if (matches) {
    textbox.value = decodeURIComponent(matches[1]);
  }

  // Even if we did not set the filter string via the URL query,
  // textbox might have been set via some other mechanism
  if (textbox.value) {
    FilterPrefs();
  }
  textbox.focus();
}