function delete_folder(directory_id) {
    swal({
        title: 'Delete folder',
        text: 'Are you sure you want to delete this folder? All subfolders and notes will be deleted as well.',
        icon: 'warning',
        buttons: {
            cancel: {
                text: 'Cancel',
                value: null,
                visible: true,
            },
            confirm: {
                text: 'Delete',
                value: true,
            }
        },
        dangerMode: true,
        closeOnEsc: false,
        allowOutsideClick: false,
        allowEnterKey: false
    })
        .then((willDelete) => {
            if (willDelete) {
                delete_folder_api(directory_id);
            }
        });
}