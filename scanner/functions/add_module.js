function add_module() {
    url = 'modules/add/modal' + case_param();
    $('#modal_add_module_content').load(url, function (response, status, xhr) {
        $('#form_new_module').on("submit", preventFormDefaultBehaviourOnSubmit);
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }

        $('#submit_new_module').on("click", function () {

            post_request_api('modules/add', JSON.stringify($('#form_new_module').serializeObject()), true)
            .done((data) => {
                if(notify_auto_api(data)) {
                    refresh_modules(true);
                    refresh_modules_hooks(true);
                    $('#modal_add_module').modal('hide');
                } else {
                    $('#alert_mod_add').text(data.message);
                    if (data.data) {
                        $('#details_list').empty();
                        for(var i in data.data)
                        {
                           var output='<li>'+data.data[i]+'</li>';
                           $('#details_list').append(output);
                        }

                        $('#alert_mod_details').show();
                    }
                    $('#alert_mod_add').show();
                    $('#submit_new_module').text("Retry");
                }
            })
            .fail((error) => {
                data = error.responseJSON;
                $('#submit_new_module').text('Save');
                $('#alert_mod_add').text(data.message);
                if (data.data && data.data.length > 0) {
                    $('#details_list').empty();
                    for(var i in data.data)
                    {
                       var output='<li>'+data.data[i]+'</li>';
                       $('#details_list').append(output);
                    }

                    $('#alert_mod_details').show();
                }
                $('#alert_mod_add').show();
                $('#submit_new_module').text("Retry");

            });

            return false;
        })
    });
    $('#modal_add_module').modal({ show: true });
}