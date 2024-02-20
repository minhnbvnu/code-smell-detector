function setupCustomFileProperties(files, groupID) {
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            file.extra = {
                nameNoExtension: file.name.substring(0, file.name.lastIndexOf('.')),
                extension: file.name.substring(file.name.lastIndexOf('.') + 1),
                fileID: i,
                uniqueID: getUniqueID(),
                groupID: groupID,
                prettySize: prettySize(file.size)
            };
        }
    }