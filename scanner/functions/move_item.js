function move_item(item_id, item_type) {
    // Create a modal with a list of directories to move the folder to
    let modal = $('#moveFolderModal');

    let directoriesListing = $('<ul></ul>');
    $('#dirListingMove').empty().append(directoriesListing);

    let directoryMap = new Map();
    $('#directoriesListing').find('li').filter('.directory').each(function() {
        let directory = $(this).data('directory');
        directoryMap.set(directory.id, directory);
    });

    let subdirectoryIds = new Set();

    function addSubdirectoryIds(directory) {
        directory.subdirectories.forEach(function(subdirectory) {
            subdirectoryIds.add(subdirectory.id);
            let subdirectoryData = directoryMap.get(subdirectory.id);
            if (subdirectoryData) {
                addSubdirectoryIds(subdirectoryData);
            }
        });
    }

    directoryMap.forEach(function(directory) {
        addSubdirectoryIds(directory);
    });

    let directories = Array.from(directoryMap.values()).filter(function(directory) {
        return item_type === 'folder' ? (item_id !== directory.id) : true;
    });

    let listItem = $('<li></li>');
    let link = $('<a></a>').attr('href', '#').text('Root');
    listItem.append(link);

    link.on('click', function(e) {
        e.preventDefault();
        if (item_type === 'note') {
            move_note_api(item_id, null).then(function() {
                modal.modal('hide');
            });
        }
        else if (item_type === 'folder') {
            move_folder_api(item_id, null).then(function () {
                modal.modal('hide');
            });
        }
    });

    directoriesListing.append(listItem);

    directories.forEach(function(directory) {
        let listItem = $('<li></li>');
        let link = $('<a></a>').attr('href', '#');
        link.append($('<i></i>').addClass('fa-regular fa-folder mr-2'));  // Add a folder icon
        link.append(' ' + directory.name);
        listItem.append(link);

        link.on('click', function(e) {
            e.preventDefault();
            if (item_type === 'note') {
                move_note_api(item_id, directory.id).then(function() {
                    // reload the directories
                    load_directories()
                    .then(function() {
                        note_detail(item_id);
                        modal.modal('hide');
                    });
                });
            }
            else if (item_type === 'folder') {
                move_folder_api(item_id, directory.id).then(function () {
                    load_directories()
                    .then(function() {
                        modal.modal('hide');
                    });
                });
            }
        });

        directoriesListing.append(listItem);
    });

    modal.modal('show');
}