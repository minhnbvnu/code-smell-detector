function stylesFromLibrary(library, styleType) {
    var libraryDocumentData = library.document();
    var allLibraryTextStyles = libraryDocumentData.layerTextStyles().objects();
    var allLibraryLayerStyles = libraryDocumentData.layerStyles().objects();
    var allLibraryStyles;
    if (styleType == "text") {
        allLibraryStyles = allLibraryTextStyles;
    }
    if (styleType == "layer") {
        allLibraryStyles = allLibraryLayerStyles;
    }
    return allLibraryStyles;
}