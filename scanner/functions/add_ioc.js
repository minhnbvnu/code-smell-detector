function add_ioc() {
    url = 'ioc/add/modal' + case_param();

    $('#modal_add_ioc_content').load(url, function (response, status, xhr) {
        hide_minimized_modal_box();
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }

        g_ioc_desc_editor = get_new_ace_editor('ioc_description', 'ioc_desc_content', 'target_ioc_desc',
                            function() {
                                $('#last_saved').addClass('btn-danger').removeClass('btn-success');
                                $('#last_saved > i').attr('class', "fa-solid fa-file-circle-exclamation");
                            }, null);

        g_ioc_desc_editor.setOption("minLines", "10");
        edit_in_ioc_desc();

        headers = get_editor_headers('g_ioc_desc_editor', null, 'ioc_edition_btn');
        $('#ioc_edition_btn').append(headers);


        $('#submit_new_ioc').on("click", function () {
            if(!$('form#form_new_ioc').valid()) {
                return false;
            }

            var data = $('#form_new_ioc').serializeObject();
            data['ioc_tags'] = $('#ioc_tags').val();
            data['ioc_description'] = g_ioc_desc_editor.getValue();

            ret = get_custom_attributes_fields();
            has_error = ret[0].length > 0;
            attributes = ret[1];

            if (has_error){return false;}

            data['custom_attributes'] = attributes;

            id = $('#ioc_id').val();
            
            if ($('#ioc_one_per_line').is(':checked')) {
                let iocs_values = $('#ioc_value').val();
                let iocs_list = iocs_values.split(/\r?\n/);
                for (let index in iocs_list) {
                    if (iocs_list[index] === '' || iocs_list[index] === '\n') {
                        continue;
                    }

                    data['ioc_value'] = iocs_list[index];
                    post_request_api('ioc/add', JSON.stringify(data), true, function () {
                        $('#submit_new_ioc').text('Saving data..')
                            .attr("disabled", true)
                            .removeClass('bt-outline-success')
                            .addClass('btn-success', 'text-dark');
                    })
                    .done((data) => {
                        if (data.status == 'success') {
                                reload_iocs();
                                notify_success(data.message);
                                if (index == (iocs_list.length - 1)) {
                                    $('#modal_add_ioc').modal('hide');
                                }
                        } else {
                            $('#submit_new_ioc').text('Save again');
                            swal("Oh no !", data.message, "error")
                        }
                    })
                    .always(function () {
                        $('#submit_new_ioc')
                            .attr("disabled", false)
                            .addClass('bt-outline-success')
                            .removeClass('btn-success', 'text-dark');
                    })
                }
            }

            else {
                post_request_api('ioc/add', JSON.stringify(data), true, function () {
                        $('#submit_new_ioc').text('Saving data..')
                            .attr("disabled", true)
                            .removeClass('bt-outline-success')
                            .addClass('btn-success', 'text-dark');
                    })
                .done((data) => {
                    if (data.status == 'success') {
                            reload_iocs();
                            notify_success(data.message);
                            $('#modal_add_ioc').modal('hide');

                    } else {
                        $('#submit_new_ioc').text('Save again');
                        swal("Oh no !", data.message, "error")
                    }
                })
                .always(function () {
                    $('#submit_new_ioc')
                        .attr("disabled", false)
                        .addClass('bt-outline-success')
                        .removeClass('btn-success', 'text-dark');
                })
            }
            return false;
        });

        $('#modal_add_ioc').modal({ show: true });
        $('#ioc_value').focus();

    });

    return false;
}