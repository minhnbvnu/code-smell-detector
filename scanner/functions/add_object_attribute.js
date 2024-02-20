function add_object_attribute() {
    url = '/manage/attributes/add/modal' + case_param();
    $('#modal_add_attribute_content').load(url, function (response, status, xhr) {
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }

        $('#submit_new_attribute').on("click", function () {
            var form = $('#form_new_attribute').serializeObject();

            post_request_api('/manage/attributes/add', JSON.stringify(form), true)
            .done((data) => {
                if (notify_auto_api(data, true)) {
                    refresh_attribute_table();
                    $('#modal_add_attribute').modal('hide');
                }
            });

            return false;
        })
    });
    $('#modal_add_type').modal({ show: true });
}