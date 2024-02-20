function export_mod_config(module_id) {
    get_request_api('/manage/modules/export-config/' + module_id)
    .done((data) => {
        if(notify_auto_api(data, true)) {
            download_file(data.data.module_name + "_configuration_export.json", "text/json",
            JSON.stringify(data.data.module_configuration, null, 4));
        }
    });
}