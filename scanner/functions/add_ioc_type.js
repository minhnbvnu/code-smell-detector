function add_ioc_type() {
    let url = '/manage/ioc-types/add/modal' + case_param();
    $('#modal_add_type_content').load(url, function (response, status, xhr) {
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }

        $('#submit_new_ioc_type').on("click", function () {
            var form = $('form#form_new_ioc_type').serializeObject();

            post_request_api('/manage/ioc-types/add', JSON.stringify(form), true)
            .done((data) => {
                if(notify_auto_api(data)) {
                    refresh_ioc_table();
                    $('#modal_add_type').modal('hide');
                }
            });

            return false;
        })
        $('#modal_add_type').modal({ show: true });
    });

}