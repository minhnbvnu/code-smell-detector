function init_module_processing_alert(alert_id, hook_name, hook_ui_name, module_name, data_type) {
    let data = Object();
    data['hook_name'] = hook_name;
    data['module_name'] = module_name;
    data['hook_ui_name'] = hook_ui_name;
    data['csrf_token'] = $('#csrf_token').val();
    data['type'] = 'alert';
    data['targets'] = [alert_id];

    post_request_api("/dim/hooks/call", JSON.stringify(data), true)
    .done(function (data){
        notify_auto_api(data)
    });
}