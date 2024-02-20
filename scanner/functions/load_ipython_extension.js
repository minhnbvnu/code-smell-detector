function load_ipython_extension () {
        // add css first
        $('<link>')
            .attr('rel', 'stylesheet')
            .attr('type', 'text/css')
            .attr('href', require.toUrl('../main.css'))
            .appendTo('head');
        // prepare for rendermd usage
        rendermd.add_markdown_css();

        insert_tab();
        nbextensions_configurator.refresh_configurable_extensions_list();
    }