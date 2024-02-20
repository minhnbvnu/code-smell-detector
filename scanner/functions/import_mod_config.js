function import_mod_config(module_id){

    var file = $("#input_configuration_file").get(0).files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        fileData = e.target.result
        var data = new Object();
        data['csrf_token'] = $('#csrf_token').val();
        data['module_configuration'] = fileData;

        post_request_api('/manage/modules/import-config/'+ module_id, JSON.stringify(data), true)
        .done((data) => {
            if(notify_auto_api(data, true)) {
                module_detail(module_id);
                $('#modal_input_config').modal('hide');
                swal("Got news for you", data.message, "success");
            } else {
                swal("Got bad news for you", data.data, "error");
            }
        });
    };
    reader.readAsText(file)

    return false;
}