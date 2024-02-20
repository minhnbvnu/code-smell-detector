function oncreate() {
  // FireFox probably prevents `focus()` calls for some time
  // after extension is rendered.
  window.setTimeout(function() {
    document.getElementById("search-field").focus();
  }, 100);
}