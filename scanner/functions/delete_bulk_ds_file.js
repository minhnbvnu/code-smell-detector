function delete_bulk_ds_file() {

    selected_files = $(".file-selected");
    swal({
        title: "Are you sure?",
        text: `Yu are about to delete ${selected_files.length} files\nThis will delete the files on the server and any manual reference will become invalid`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    })
    .then((willDelete) => {
        if (willDelete) {
            selected_files.each((index) => {
                file_id = $(selected_files[index]).data('file-id').replace('f-', '');
                var data_sent = {
                    "csrf_token": $('#csrf_token').val()
                }
                post_request_api('/datastore/file/delete/' + file_id, JSON.stringify(data_sent))
                .done((data) => {
                    if (notify_auto_api(data)) {
                        if (index == $(".file-selected").length - 1) {
                            reset_ds_file_view();
                            load_datastore();
                        }
                        index +=1;
                    }
                });
            });
        } else {
            swal("Pfew, that was close");
        }
    });
}