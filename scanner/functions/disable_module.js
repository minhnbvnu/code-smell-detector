function disable_module(module_id) {
    post_request_api('modules/disable/' + module_id)
    .done((data) => {
        if(notify_auto_api(data)) {
            refresh_modules(true);
            refresh_modules_hooks(true);
            module_detail(module_id);
        }
    });
}