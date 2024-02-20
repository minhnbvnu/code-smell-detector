function init_module_processing_wrap(rows, data_type, out_hook_name) {
    console.log(out_hook_name);
    hook_name = null;
    for (opt in jdata_menu_options) {
        console.log(jdata_menu_options[opt]);
        if (jdata_menu_options[opt].manual_hook_ui_name == out_hook_name) {
            hook_name = jdata_menu_options[opt].hook_name;
            hook_ui_name = jdata_menu_options[opt].manual_hook_ui_name;
            module_name = jdata_menu_options[opt].module_name;
            break
        }
    }
    if (hook_name == null) {
        notify_error('Error: hook not found');
        return false;
    }
    return init_module_processing(rows, hook_name, hook_ui_name, module_name, data_type);
}