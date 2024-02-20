function insert_tab () {
        var tab_text = 'Nbextensions';
        var tab_id = 'nbextensions_configurator';

        var configurator_ui = nbextensions_configurator.build_configurator_ui();
        
        $('<div/>')
            .attr('id', tab_id)
            .append(configurator_ui)
            .addClass('tab-pane')
            .appendTo('.tab-content');

        var tab_link = $('<a>')
            .text(tab_text)
            .attr('href', '#' + tab_id)
            .attr('data-toggle', 'tab')
            .on('click', function (evt) {
                window.history.pushState(null, null, '#' + tab_id);
            });

        $('<li>')
            .append(tab_link)
            .appendTo('#tabs');

        // select tab if hash is set appropriately
        if (window.location.hash == '#' + tab_id) {
            tab_link.click();
        }
    }