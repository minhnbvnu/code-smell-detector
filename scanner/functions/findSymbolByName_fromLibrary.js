function findSymbolByName_fromLibrary(name, library) {
    var predicate = NSPredicate.predicateWithFormat("name == %@", name);
    var symbols = library.document().localSymbols().filteredArrayUsingPredicate(predicate);
    return symbols.firstObject();
}