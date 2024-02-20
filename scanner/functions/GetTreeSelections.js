function GetTreeSelections() {
  let selections = [];
  let select = signonsTree.view.selection;
  if (select) {
    let count = select.getRangeCount();
    let min = {};
    let max = {};
    for (let i = 0; i < count; i++) {
      select.getRangeAt(i, min, max);
      for (let k = min.value; k <= max.value; k++) {
        if (k != -1) {
          selections[selections.length] = k;
        }
      }
    }
  }
  return selections;
}