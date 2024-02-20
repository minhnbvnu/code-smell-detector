function delete_event(id) {
    window.location.hash = id;
    do_deletion_prompt("You are about to delete event #" + id)
    .then((doDelete) => {
        if (doDelete) {
            post_request_api("timeline/events/delete/" + id)
            .done(function(data) {
                if(notify_auto_api(data)) {
                    apply_filtering();
                    $('#modal_add_event').modal('hide');
                }
            });
        }
    });
}