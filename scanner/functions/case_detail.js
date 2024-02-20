function case_detail(id) {
    url = 'cases/details/' + id + case_param();
    $('#info_case_modal_content').load(url, function (response, status, xhr) {

        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }

        $('#modal_case_detail').modal({ show: true });

    });
}