function SignonColumnSort(column) {
  let sortedCol = getColumnByName(column);
  let lastSortedCol = getColumnByName(lastSignonSortColumn);

  // clear out the sortDirection attribute on the old column
  lastSortedCol.removeAttribute("sortDirection");

  // determine if sort is to be ascending or descending
  lastSignonSortAscending =
    column == lastSignonSortColumn ? !lastSignonSortAscending : true;

  // sort
  lastSignonSortColumn = column;
  SortTree(lastSignonSortColumn, lastSignonSortAscending);

  // set the sortDirection attribute to get the styling going
  // first we need to get the right element
  sortedCol.setAttribute(
    "sortDirection",
    lastSignonSortAscending ? "ascending" : "descending"
  );
}