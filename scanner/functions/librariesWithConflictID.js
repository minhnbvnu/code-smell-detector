function librariesWithConflictID() {

    var assetLibraryController = AppController.sharedInstance().librariesController();
    var libraries = assetLibraryController.libraries();

    if (libraries.count() == 0) {
        return nil;
    }

    // Sort by library ID
    var librariesCopy = libraries.mutableCopy();
    var sortByID = NSSortDescriptor.sortDescriptorWithKey_ascending("libraryID", true);
    librariesCopy.sortUsingDescriptors(NSArray.arrayWithObject(sortByID));

    var librariesCopy2 = librariesCopy.mutableCopy();
    librariesCopy2.forEach(function(library, index) {
        if (library.libraryID()) {
            if (index == 0) {
                if (!library.libraryID().isEqual(librariesCopy2[index + 1].libraryID())) {
                    librariesCopy.removeObject(library);
                }
            } else if (index == librariesCopy2.count() - 1) {
                if (!library.libraryID().isEqual(librariesCopy2[index - 1].libraryID())) {
                    librariesCopy.removeObject(library);
                }
            } else {
                if (
                    !library.libraryID().isEqual(librariesCopy2[index + 1].libraryID()) &&
                    !library.libraryID().isEqual(librariesCopy2[index - 1].libraryID())
                ) {
                    librariesCopy.removeObject(library);
                }
            }
        } else {
            librariesCopy.removeObject(library);
        }
    });

    return librariesCopy;
}