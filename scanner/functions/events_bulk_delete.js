function events_bulk_delete() {
    var selected_rows = $(".timeline-selected");
    if(selected_rows.length <= 0) {
        console.log("no rows selected, returning");
        return true;
    }

    swal({
        title: "Are you sure?",
        text: "You are about to delete " + selected_rows.length + " events.\nThere is no coming back.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete them'
    })
    .then((willDelete) => {
        if (willDelete) {
            selected_rows.each(function(index) {
                var object = selected_rows[index];
                var event_id = object.getAttribute('id').replace("event_","");
                post_request_api("timeline/events/delete/" + event_id)
                .done(function(data) {
                    notify_auto_api(data);
                    if (index === selected_rows.length - 1) {
                        get_or_filter_tm();
                    }
                });
            });
        } else {
            swal("Pfew, that was close");
        }
    });
}