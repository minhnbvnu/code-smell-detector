function getSymbolMastersInSelection(selection) {
    var predicate = NSPredicate.predicateWithFormat("className == %@", "MSSymbolMaster");
    return selection.filteredArrayUsingPredicate(predicate);
}