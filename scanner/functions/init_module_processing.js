function init_module_processing(rows, hook_name, hook_ui_name, module_name, data_type) {
    var data = Object();
    data['hook_name'] = hook_name;
    data['module_name'] = module_name;
    data['hook_ui_name'] = hook_ui_name;
    data['csrf_token'] = $('#csrf_token').val();
    data['type'] = data_type;
    data['targets'] = [];

    type_map = {
        "ioc": "ioc_id",
        "asset": "asset_id",
        "task": "task_id",
        "global_task": "task_id",
        "evidence": "id"
    }

    for (index in rows) {
        if (typeof rows[index] === 'object') {
            data['targets'].push(rows[index][type_map[data_type]]);
        } else {
            data['targets'].push(rows[index]);
        }
    }

    post_request_api("/dim/hooks/call", JSON.stringify(data), true)
    .done(function (data){
        notify_auto_api(data)
    });
}