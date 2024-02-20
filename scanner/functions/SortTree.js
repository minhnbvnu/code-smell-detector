function SortTree(column, ascending) {
  let table = GetVisibleLogins();
  // remember which item was selected so we can restore it after the sort
  let selections = GetTreeSelections();
  let selectedNumber = selections.length ? table[selections[0]].number : -1;
  function compareFunc(a, b) {
    let valA, valB;
    switch (column) {
      case "origin":
        let realmA = a.httpRealm;
        let realmB = b.httpRealm;
        realmA = realmA == null ? "" : realmA.toLowerCase();
        realmB = realmB == null ? "" : realmB.toLowerCase();

        valA = a[column].toLowerCase() + realmA;
        valB = b[column].toLowerCase() + realmB;
        break;
      case "username":
      case "password":
        valA = a[column].toLowerCase();
        valB = b[column].toLowerCase();
        break;

      default:
        valA = a[column];
        valB = b[column];
    }

    if (valA < valB) {
      return -1;
    }
    if (valA > valB) {
      return 1;
    }
    return 0;
  }

  // do the sort
  table.sort(compareFunc);
  if (!ascending) {
    table.reverse();
  }

  // restore the selection
  let selectedRow = -1;
  if (selectedNumber >= 0 && false) {
    for (let s = 0; s < table.length; s++) {
      if (table[s].number == selectedNumber) {
        // update selection
        // note: we need to deselect before reselecting in order to trigger ...Selected()
        signonsTree.view.selection.select(-1);
        signonsTree.view.selection.select(s);
        selectedRow = s;
        break;
      }
    }
  }

  // display the results
  signonsTree.invalidate();
  if (selectedRow >= 0) {
    signonsTree.ensureRowIsVisible(selectedRow);
  }
}