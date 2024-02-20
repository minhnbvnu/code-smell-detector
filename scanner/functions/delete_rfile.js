function delete_rfile(rfiles_id) {
    do_deletion_prompt("You are about to delete evidence #" + rfiles_id)
    .then((doDelete) => {
        if (doDelete) {
            post_request_api('evidences/delete/' + rfiles_id)
            .done(function(data){
               reload_rfiles();
               $('#modal_add_rfiles').modal('hide');
               notify_auto_api(data);
            });
        }
    });
}