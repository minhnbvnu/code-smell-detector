function show_timeline_filter_help() {
    $('#modal_help').load('/case/timeline/filter-help/modal' + case_param(), function (response, status, xhr) {
        if (status !== "success") {
             ajax_notify_error(xhr, '/case/timeline/filter-help/modal');
             return false;
        }
        $('#modal_help').modal('show');
    });
}