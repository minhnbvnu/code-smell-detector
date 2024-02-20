function getSymbolInstancesInSelection(selection) {
    var predicate = NSPredicate.predicateWithFormat("className == %@", "MSSymbolInstance");
    return selection.filteredArrayUsingPredicate(predicate);
}