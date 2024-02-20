function rename_folder(directory_id, new_directory=false) {

    // Prompt the user for a new name
    swal({
        title: new_directory?  'Rename directory': "Name the new folder",
        text: 'Enter a new name for the folder',
        content: 'input',
        buttons: {
            cancel: {
                text: 'Cancel',
                value: null,
                visible: true,
            },
            confirm: {
                text: new_directory ? 'Ok' : 'Rename',
                value: true,
            }
        },
        dangerMode: true,
        closeOnEsc: false,
        allowOutsideClick: false,
        allowEnterKey: false
    })
        .then((newName) => {
            if (newName) {
                rename_folder_api(directory_id, newName);
            }
        });
}