function module_detail(module_id) {
    url = 'modules/update/' + module_id + '/modal' + case_param();
    $('#modal_add_module_content').load(url, function (response, status, xhr) {
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }

        $('#submit_new_module').on("click", function () {
            post_request_api('modules/update/' + module_id, $('#form_new_module').serializeArray())
            .done((data) => {
                if(notify_auto_api(data)) {
                    module_detail(module_id);
                    $('#modal_update_param').modal('hide');
                }
            });

            return false;
        })

    });
    $('#modal_add_module').modal({ show: true });
}