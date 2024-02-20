function get_md_helper_modal() {
    $('#modal_md_helper').load('/case/md-helper?cid=' + get_caseid(), function (response, status, xhr) {
         if (status !== "success") {
             ajax_notify_error(xhr, '/case/md-helper?cid=' + get_caseid());
             return false;
            }
         $('#shortcutModal').modal("show");
    });
}