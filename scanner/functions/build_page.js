function build_page () {
        return require([
            'base/js/page',
            'base/js/events',
        ], function (
            page,
            events
        ) {

        add_css('./main.css');
        $('body').addClass(page_class);

        var nbext_config_page = Jupyter.page = new page.Page('div#header', 'div#site');

        // prepare for rendermd usage
        rendermd.add_markdown_css();
        nbext_config_page.show_header();
        build_configurator_ui().appendTo('#site');
        events.trigger('resize-header.Page');

        nbext_config_page.show();

        refresh_configurable_extensions_list().then(function () {
        window.addEventListener('popstate', popstateCallback);
        setTimeout(popstateCallback, 0);
        });

        return nbext_config_page;
        });
    }