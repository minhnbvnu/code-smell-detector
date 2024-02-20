function refresh_configurable_extensions_list () {
        // remove/unload any existing nbextensions, readme etc
        var selector_nav = $('.nbext-selector ul').empty();
        $('.nbext-ext-row').remove();
        load_readme({readme: undefined});
        // add a loading indicator
        $('<div>')
            .addClass('col-xs-12 nbext-selector-loading')
            .append('<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>')
            .append('<span class="sr-only">Loading...</span>')
            .appendTo(selector_nav);
        // do the actual work
        return load_all_configs().then(function () {
            var api_url = utils.url_path_join(
                base_url, 'nbextensions/nbextensions_configurator/list');
            return utils.promising_ajax(api_url, {
                cache: false,
                type: "GET",
                dataType: "json",
            });
        }).then(function (extension_list) {
            build_extension_list(extension_list);
        }).then(function () {
            // remove loading indicator
            $('.nbext-selector ul .nbext-selector-loading').remove();
        });
    }