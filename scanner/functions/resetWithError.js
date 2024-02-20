function resetWithError(errMsg) {
  console.error(errMsg);
  domain = "";
  logins = resultLogins = [];
  fillOnSubmit = false;
  searching = false;
  var filterSearch = document.getElementById("filter-search");
  filterSearch.style.display = "none";
  filterSearch.textContent = "";
  var searchField = document.getElementById("search-field");
  searchField.setAttribute("placeholder", "Search passwords...");
  error = errMsg;
  m.redraw();
  searchField.focus();
}