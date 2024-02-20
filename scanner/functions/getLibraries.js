function getLibraries(type) {
        var libraries = [];
        var libraryIdNames = [];
        var objects;
        if (type == "Symbol") {
            objects = importedSymbols;
        } else if (type == "Layer Style") {
            objects = importedLayerStyles;
        } else if (type == "Text Style") {
            objects = importedTextStyles;
        }
        objects.forEach(function(item) {
            var library = item.getLibrary();
            var idName = library.id + "-" + library.name;
            if (!libraryIdNames.includes(idName)) {
                libraries.push(library);
                libraryIdNames.push(idName);
            }
        });
        return libraries;
    }