function delete_ds_folder(node) {
    node = node.replace('d-', '');
    swal({
        title: "Are you sure?",
        text: "This will delete all files included and sub-folders",
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
            post_request_api('/datastore/folder/delete/' + node, JSON.stringify(data_sent))
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