function fire_upload_case_template() {
    let url = '/manage/case-templates/upload/modal' + case_param();
    $('#modal_upload_case_template_json').load(url, function (response, status, xhr) {
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }
    });
    $('#modal_upload_case_template').modal({ show: true });
}