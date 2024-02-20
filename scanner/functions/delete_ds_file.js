function delete_ds_file(file_id) {
    file_id = file_id.replace('f-', '');
    swal({
        title: "Are you sure?",
        text: "This will delete the file on the server and any manual reference will become invalid",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    })
    .then((willDelete) => {
        if (willDelete) {
            var data_sent = {
                "csrf_token": $('#csrf_token').val()
            }
            post_request_api('/datastore/file/delete/' + file_id, JSON.stringify(data_sent))
            .done((data) => {
                if (notify_auto_api(data)) {
                    reset_ds_file_view();
                    load_datastore();
                }
            });
        } else {
            swal("Pfew, that was close");
        }
    });
}