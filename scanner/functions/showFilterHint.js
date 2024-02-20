function showFilterHint(show = true) {
  var filterHint = document.getElementById("filter-search");
  var searchField = document.getElementById("search-field");
  if (show) {
    filterHint.style.display = "block";
    searchField.setAttribute("placeholder", "Refine search...");
  } else {
    filterHint.style.display = "none";
    searchField.setAttribute("placeholder", "Search passwords...");
  }
}