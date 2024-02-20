async function load_directories() {
    return get_request_api('/case/notes/directories/filter')
        .done((data) => {
            if (notify_auto_api(data, true)) {
                data = data.data;
                let directoriesListing = $('#directoriesListing');
                directoriesListing.empty();

                let directoryMap = new Map();
                data.forEach(function(directory) {
                    directoryMap.set(directory.id, directory);
                });

                let subdirectoryIds = new Set();
                data.forEach(function(directory) {
                    directory.subdirectories.forEach(function(subdirectory) {
                        subdirectoryIds.add(subdirectory.id);
                    });
                });

                let directories = data.filter(function(directory) {
                    return !subdirectoryIds.has(directory.id);
                });

                directories.forEach(function(directory) {
                    directoriesListing.append(createDirectoryListItem(directory, directoryMap));
                });
            }
        });
}