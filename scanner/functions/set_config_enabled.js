function set_config_enabled (extension, state) {
        state = state !== undefined ? state : true;
        console.log(log_prefix, state ? ' enabled' : 'disabled', extension.require);
        // for pre-4.2 versions, the javascript loading nbextensions actually
        // ignores the true/false state, so to disable we have to delete the key
        if ((version_compare(((typeof sys_info === 'undefined') ? Jupyter.version : sys_info.notebook_version),
            '4.2') < 0) && !state) {
            state = null;
        }
        var to_load = {};
        to_load[extension.require] = state;
        configs[extension.Section].update({load_extensions: to_load});
    }