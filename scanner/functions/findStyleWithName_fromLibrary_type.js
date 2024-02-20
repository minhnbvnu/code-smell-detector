function findStyleWithName_fromLibrary_type(name, library, styleType) {
    var allLibraryStyles = stylesFromLibrary(library, styleType);
    var predicate = NSPredicate.predicateWithFormat("name == %@", name);
    var result = allLibraryStyles.filteredArrayUsingPredicate(predicate);
    return result.firstObject();
}