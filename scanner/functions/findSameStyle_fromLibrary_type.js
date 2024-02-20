function findSameStyle_fromLibrary_type(style, library, styleType) {
    var allLibraryStyles = stylesFromLibrary(library, styleType);
    var result = [];
    allLibraryStyles.forEach(libraryStyle => {
        if (style.value().propertiesAreEqual(libraryStyle.value())) {
            result.push(libraryStyle);
        }
    });
    return result.length > 0 ? result[0] : null;
}