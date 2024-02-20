function update_param(module_id, param_name) {
    url = 'modules/get-parameter/' + decodeURIComponent(escape(window.btoa(param_name))) + case_param();
    $('#modal_update_param_content').load(url, function (response, status, xhr) {
        $('#form_update_param').on("submit", preventFormDefaultBehaviourOnSubmit);
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }
        $('#submit_save_parameter').on("click", function () {
            var data = Object();
            if ($('#editor_detail').length != 0) {
                editor = ace.edit("editor_detail");
                data['parameter_value'] = editor.getSession().getValue();
                data['csrf_token'] = $('#csrf_token').val();
            } else {
                data = $('#form_update_param').serializeObject();
                if ($('#parameter_value').attr('type') == "checkbox") {
                    data['parameter_value'] = $('#parameter_value').prop('checked');
                }
            }

            post_request_api('modules/set-parameter/' + decodeURIComponent(escape(window.btoa(param_name))), JSON.stringify(data))
            .done((data) => {
                if(notify_auto_api(data)) {
                    module_detail(module_id);
                    refresh_modules(true);
                    $('#modal_update_param').modal('hide');
                }
            })

            return false;
        })
    });
    $('#modal_update_param').modal({ show: true });
}