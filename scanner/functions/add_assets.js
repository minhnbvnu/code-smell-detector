function add_assets() {
    url = 'assets/add/modal' + case_param();
    $('#modal_add_asset_content').load(url, function (response, status, xhr) {
        hide_minimized_modal_box();
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }

        g_asset_desc_editor = get_new_ace_editor('asset_description', 'asset_desc_content', 'target_asset_desc',
                            function() {
                                $('#last_saved').addClass('btn-danger').removeClass('btn-success');
                                $('#last_saved > i').attr('class', "fa-solid fa-file-circle-exclamation");
                            }, null);
        g_asset_desc_editor.setOption("minLines", "10");
        edit_in_asset_desc();

        let headers = get_editor_headers('g_asset_desc_editor', null, 'asset_edition_btn');
        $('#asset_edition_btn').append(headers);

        $('#ioc_links').select2({});

        $('#submit_new_assets').on("click", function () {

            let assets = $('#assets_name').val();
            let assets_list = assets.split('\n');
            for (let index in assets_list) {

                let data = $('#form_new_assets').serializeObject();
                data['asset_name'] = assets_list[index];
                delete data['assets_name'];

                if (data['asset_name'] == "" || data['asset_name'] == null || data['asset_name'] == '\n') {
                    continue;
                }

                data['csrf_token'] = $('#csrf_token').val();
                if (typeof data["ioc_links"] == "string") {
                    data["ioc_links"] = [data["ioc_links"]]
                }
                data['asset_tags'] = $('#asset_tags').val();
                data['asset_description'] = g_asset_desc_editor.getValue();
                let ret = get_custom_attributes_fields();
                let has_error = ret[0].length > 0;
                let attributes = ret[1];

                if (has_error) {
                    return false;
                }

                data['custom_attributes'] = attributes;

                post_request_api('assets/add', JSON.stringify(data), true, function () {
                    $('#submit_new_assets').text('Saving data..')
                        .attr("disabled", true)
                        .removeClass('bt-outline-success')
                        .addClass('btn-success', 'text-dark');
                })
                    .done((data) => {
                        if (data.status == 'success') {
                            reload_assets();
                            if (index == (assets_list.length - 1)) {
                                $('#modal_add_asset').modal('hide');
                                notify_success("Assets created");
                            }
                        } else {
                            $('#submit_new_assets').text('Save again');
                            swal("Oh no !", data.message, "error")
                        }
                    })
                    .always(function () {
                        $('#submit_new_assets')
                            .attr("disabled", false)
                            .addClass('bt-outline-success')
                            .removeClass('btn-success', 'text-dark');
                    })
                    .fail(function (error) {
                        $('#submit_new_assets').text('Save');
                        propagate_form_api_errors(error.responseJSON.data);
                    })
            }

            return false;
        })

        $('#modal_add_asset').modal({ show: true });
        $('#asset_name').focus();

    });

    $('.dtr-modal').hide();
}