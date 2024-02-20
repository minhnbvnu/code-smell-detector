function delete_ioc(ioc_id) {
    do_deletion_prompt("You are about to delete IOC #" + ioc_id)
    .then((doDelete) => {
        if (doDelete) {
            post_request_api('ioc/delete/' + ioc_id)
            .done((data) => {
                if (data.status == 'success') {
                    reload_iocs();
                    notify_success(data.message);
                    $('#modal_add_ioc').modal('hide');

                } else {
                    swal("Oh no !", data.message, "error")
                }
            })
        }
    });
}