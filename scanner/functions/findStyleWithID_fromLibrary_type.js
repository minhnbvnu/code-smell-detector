function findStyleWithID_fromLibrary_type(id, library, styleType) {
    var allLibraryStyles = stylesFromLibrary(library, styleType);
    var predicate = NSPredicate.predicateWithFormat("objectID == %@", id);
    var result = allLibraryStyles.filteredArrayUsingPredicate(predicate);
    return result.firstObject();
}