function initializeAllTables(scope) {
  let tables = scope.querySelectorAll("[data-make-chart]");
  for(let table of tables) {
    // make sure not in a closed details
    if(table.closest("details[open]") || !table.closest("details")) {
      makeTable(table);
    }
  }
}