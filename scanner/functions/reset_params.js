function reset_params (extension) {
        // first remove config values:
        return conf_dot_delete_keys(
            configs[extension.Section],
            extension.Parameters.map(function (param) {
                return param.name;
            })
        ).then(function () {
            // now rebuild param ui
            extension.ui.find('.nbext-params > .list-group')
                .replaceWith(build_params_ui(extension.Parameters));
        });
    }