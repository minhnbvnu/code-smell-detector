function createDirectoryListItem(directory, directoryMap) {
    // Create a list item for the directory
    var listItem = $('<li></li>').attr('id', 'directory-' + directory.id).addClass('directory');
    listItem.data('directory', directory);
    var link = $('<a></a>').attr('href', '#');
    var icon = $('<i></i>').addClass('fa-regular fa-folder');  // Create an icon for the directory
    link.append(icon);
    link.append($('<span>').text(directory.name));
    listItem.append(link);

    let currentNoteID = getSharedLink();

    var container = $('<div></div>').addClass('directory-container');
    listItem.append(container);

    let notesInfo = getNotesInfo(directory, directoryMap, currentNoteID);
    icon.append($('<span></span>').addClass('notes-number').text(notesInfo.totalNotes));
    if (!notesInfo.hasMoreThanFiveNotes || notesInfo.dirContainsCurrentNote) {
        icon.removeClass('fa-folder').addClass('fa-folder-open');
    } else {
        container.hide();
    }

    link.on('click', function(e) {
        e.preventDefault();
        container.slideToggle();
        icon.toggleClass('fa-folder fa-folder-open');
    });

    link.on('contextmenu', function(e) {
        e.preventDefault();

        let menu = $('<div></div>').addClass('dropdown-menu show').css({
            position: 'absolute',
            left: e.pageX,
            top: e.pageY
        });

        menu.append($('<a></a>').addClass('dropdown-item').attr('href', '#').text('Add note').on('click', function(e) {
            e.preventDefault();
            add_note(directory.id);
        }));
        menu.append($('<a></a>').addClass('dropdown-item').attr('href', '#').text('Add directory').on('click', function(e) {
            e.preventDefault();
            add_folder(directory.id);
        }));

        menu.append($('<div></div>').addClass('dropdown-divider'));
        menu.append($('<a></a>').addClass('dropdown-item').attr('href', '#').text('Rename').on('click', function(e) {
            e.preventDefault();
            rename_folder(directory.id);
        }));
        menu.append($('<a></a>').addClass('dropdown-item').attr('href', '#').text('Move').on('click', function(e) {
            e.preventDefault();
            move_item(directory.id, 'folder');
        }));

        menu.append($('<div></div>').addClass('dropdown-divider'));
        menu.append($('<a></a>').addClass('dropdown-item text-danger').attr('href', '#').text('Delete').on('click', function(e) {
            e.preventDefault();
            delete_folder(directory.id);
        }));

        $('body').append(menu).on('click', function() {
            menu.remove();
        });
    });

    // If the directory has subdirectories, create a list item for each subdirectory
    if (directory.subdirectories && directory.subdirectories.length > 0) {
        var subdirectoriesList = $('<ul></ul>').addClass('nav');
        directory.subdirectories.forEach(function(subdirectory) {
            // Look up the subdirectory in the directoryMap
            var subdirectoryData = directoryMap.get(subdirectory.id);
            if (subdirectoryData) {
                subdirectoriesList.append(createDirectoryListItem(subdirectoryData, directoryMap));
            }
        });
        container.append(subdirectoriesList);
    }

    // If the directory has notes, create a list item for each note
    if (directory.notes && directory.notes.length > 0) {
        var notesList = $('<ul></ul>').addClass('nav');
        directory.notes.forEach(function(note) {
            var noteListItem = $('<li></li>').attr('id', 'note-' + note.id).addClass('note');
            var noteLink = $('<a></a>').attr('href', '#');

            noteLink.append($('<i></i>').addClass('fa-regular fa-file'));
            noteLink.append($('<span>').text(note.title));

            // Add a click event listener to the note link that calls note_detail with the note ID
            noteLink.on('click', function(e) {
                e.preventDefault();
                note_detail(note.id);

                // Highlight the note in the directory
                $('.note').removeClass('note-highlight');
                noteListItem.addClass('note-highlight');
            });

            noteLink.on('contextmenu', function(e) {
                e.preventDefault();

                let menu = $('<div></div>').addClass('dropdown-menu show').css({
                    position: 'absolute',
                    left: e.pageX,
                    top: e.pageY
                });


                menu.append($('<a></a>').addClass('dropdown-item').attr('href', '#').text('Move').on('click', function (e) {
                    e.preventDefault();
                    move_item(note.id, 'note');
                }));

                menu.append($('<div></div>').addClass('dropdown-divider'));
                menu.append($('<a></a>').addClass('dropdown-item text-danger').attr('href', '#').text('Delete').on('click', function (e) {
                    e.preventDefault();
                    delete_note(note.id, cid);
                }));

                $('body').append(menu).on('click', function() {
                    menu.remove();
                });

            });

            noteListItem.append(noteLink);
            notesList.append(noteListItem);
        });
        container.append(notesList);
    }

    return listItem;
}