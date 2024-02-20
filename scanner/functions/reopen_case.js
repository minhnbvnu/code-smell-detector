function reopen_case(id) {
    post_request_api('/manage/cases/reopen/' + id)
    .done((data) => {
        if (!refresh_case_table()) {
            window.location.reload();
        }
        $('#modal_case_detail').modal('hide');
    });
}