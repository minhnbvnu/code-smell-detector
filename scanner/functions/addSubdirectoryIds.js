function addSubdirectoryIds(directory) {
        directory.subdirectories.forEach(function(subdirectory) {
            subdirectoryIds.add(subdirectory.id);
            let subdirectoryData = directoryMap.get(subdirectory.id);
            if (subdirectoryData) {
                addSubdirectoryIds(subdirectoryData);
            }
        });
    }