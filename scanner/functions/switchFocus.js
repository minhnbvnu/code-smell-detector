function switchFocus(firstSelector, nextNodeAttr) {
  var searchField = document.getElementById("search-field");
  var newActive = searchField;

  if (document.activeElement === searchField) {
    newActive = document.querySelector(firstSelector);
  } else {
    let tmp = document.activeElement["parentElement"][nextNodeAttr];
    if (tmp !== null) {
      newActive = tmp["firstElementChild"];
    }
  }

  newActive.focus();
}