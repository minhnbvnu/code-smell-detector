function update_asset(do_close){
    if(!$('form#form_new_asset').valid()) {
        return false;
    }

    var data = $('#form_new_asset').serializeObject();
    if (typeof data["ioc_links"] === "string") {
        data["ioc_links"] = [data["ioc_links"]]
    } else if (typeof data["ioc_links"] === "object") {
        tmp_data = [];
        for (ioc_link in data["ioc_links"]) {
            if (typeof ioc_link === "string") {
                tmp_data.push(data["ioc_links"][ioc_link]);
            }
        }
        data["ioc_links"] = tmp_data;
    }
    else {
        data["ioc_links"] = [];
    }
    data['asset_tags'] = $('#asset_tags').val();
    data['asset_description'] = g_asset_desc_editor.getValue();

    ret = get_custom_attributes_fields();
    has_error = ret[0].length > 0;
    attributes = ret[1];

    if (has_error){return false;}

    data['custom_attributes'] = attributes;

    post_request_api('assets/update/' + g_asset_id, JSON.stringify(data),  true)
    .done((data) => {
        if (data.status == 'success') {
            reload_assets();
            $('#submit_new_asset').text("Saved").addClass('btn-outline-success').removeClass('btn-outline-danger').removeClass('btn-outline-warning');
            $('#last_saved').removeClass('btn-danger').addClass('btn-success');
            $('#last_saved > i').attr('class', "fa-solid fa-file-circle-check");
            if (do_close) {
                $('#modal_add_asset').modal('hide');
            }
            notify_success('Asset updated');
        } else {
            $('#submit_new_asset').text('Save again');
            swal("Oh no !", data.message, "error")
        }
    })

    return false;
}