function findSymbolByID_fromLibrary(id, library) {
    return library.document().symbolWithID(id);
}