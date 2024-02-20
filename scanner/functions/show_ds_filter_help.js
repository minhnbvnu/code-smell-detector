function show_ds_filter_help() {
    $('#modal_help').load('/datastore/filter-help/modal' + case_param(), function (response, status, xhr) {
        if (status !== "success") {
             ajax_notify_error(xhr, '/datastore/filter-help/modal');
             return false;
        }
        $('#modal_help').modal('show');
    });
}