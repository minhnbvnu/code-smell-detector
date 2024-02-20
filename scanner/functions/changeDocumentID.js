function changeDocumentID(document, documentPath) {
    var newID = NSUUID.UUID().UUIDString();
    var documentController = NSDocumentController.sharedDocumentController();
    var fileURL = NSURL.fileURLWithPath(documentPath);

    // If library document is opened
    var libraryDocument = documentController.documentForURL(fileURL);
    if (libraryDocument) {
        libraryDocument.documentData().setObjectID(newID);
        libraryDocument.saveDocument(nil);
        return newID;
    } else {
        var error = MOPointer.alloc().init();
        var newDocument = MSDocument.alloc().init();
        newDocument.setDisplayName(documentPath.slice(documentPath.lastIndexOf("/") + 1));
        var type = "com.bohemiancoding.sketch.drawing";
        newDocument.readFromURL_ofType_error(fileURL, type, error);

        if (error.value() != null) {
            document.showMessage("Error: " + error.value());
            return;
        }

        if (newDocument.documentData().documentIsEmpty()) {
            return;
        }

        newDocument.documentData().setObjectID(newID);

        // Hack
        newDocument.addBlankPage();
        newDocument.documentData().removePage(document.pages().lastObject());

        var error2 = MOPointer.alloc().init();
        var writeToNewDocument = newDocument.writeToURL_ofType_forSaveOperation_originalContentsURL_error(
            fileURL, type, NSSaveOperation, nil, error2
        );

        if (error2.value() != null) {
            document.showMessage("Error: " + error2.value());
            return;
        }

        if (writeToNewDocument) {
            return newID;
        } else {
            return nil;
        }
    }
}