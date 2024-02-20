function getArtboardsFromLibrary(library) {
    var sketch = require("sketch/dom");
    var util = require("util");
    var libDocument = library.getDocument();
    return util.toArray(libDocument.sketchObject.allArtboards()).filter(function(artboard) {
        return artboard.className() == "MSArtboardGroup";
    }).map(function(artboard) {
        return sketch.fromNative(artboard);
    });
}