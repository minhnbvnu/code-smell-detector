function build_configurator_ui () {
        var config_ui = $('<div/>')
            .attr('id', 'nbextensions-configurator-container')
            .addClass('nbextensions-configurator-container')
            .addClass('container');

        var button_sets = $('<div/>')
            .addClass('nbext-buttons tree-buttons no-padding pull-right')
            .prependTo(config_ui);

        var ext_buttons = $('<span/>')
            .addClass('btn-group')
            .appendTo(button_sets);

        var refresh_button = $('<button/>')
            .on('click', refresh_configurable_extensions_list)
            .attr('title', 'Refresh list of nbextensions')
            .addClass('nbext-button-refreshlist btn btn-default btn-xs')
            .appendTo(ext_buttons);

        var selector = $('<div/>')
            .addClass('row container-fluid nbext-selector')
            .appendTo(config_ui);

        $('<i/>')
            .addClass('fa fa-refresh')
            .appendTo(refresh_button);

        $('<h3>Configurable nbextensions</h3>').appendTo(selector);

        $('<div/>')
            .addClass('nbext-showhide-incompat')
            .append(
                build_param_input({
                    name: 'nbext_hide_incompat',
                    input_type: 'checkbox',
                    section: 'common'
                })
                    .attr('id', 'nbext_hide_incompat')
                    .off('change', handle_input)
                    .on('change', function (evt) {
                        set_hide_incompat(handle_input(evt));
                    })
            )
            .append(' disable configuration for nbextensions without explicit compatibility (they may break your notebook environment, but can be useful to show for nbextension development)')
            .appendTo(selector);

        filter_build_ui().appendTo(selector);

        $('<nav/>')
            .addClass('row')
            .append('<ul class="nav nav-pills"/>')
            .appendTo(selector);

        var readme = $('<div/>')
            .addClass('row nbext-readme panel panel-default')
            .css('display', 'none') // hide until an nbextension with a readme reveals it
            .appendTo(config_ui);
        $('<div class="panel-heading"/>')
            .append('<i class="fa fa-fw fa-caret-down"/>')
            .append('<span>')
            .on('click', panel_showhide_callback)
            .appendTo(readme);
        $('<div class="panel-body"/>')
            .appendTo(readme);

        return config_ui;
    }