function delete_asset(asset_id) {
    do_deletion_prompt("You are about to delete asset #" + asset_id)
    .then((doDelete) => {
        if (doDelete) {
            post_request_api('assets/delete/' + asset_id)
            .done((data) => {
                if (data.status == 'success') {
                    reload_assets();
                    $('#modal_add_asset').modal('hide');
                    notify_success('Asset deleted');
                } else {
                    swal("Oh no !", data.message, "error")
                }
            });
        }
    });
}