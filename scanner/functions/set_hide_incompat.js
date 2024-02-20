function set_hide_incompat (hide_incompat) {
        $('.nbext-compat-div').toggle(!hide_incompat);
        $('.nbext-selector .nbext-incompatible')
            .toggleClass('disabled', hide_incompat)
            .attr('title', hide_incompat ? 'possibly incompatible' : '');
        set_input_value($('#nbext_hide_incompat'), hide_incompat);

        var selector = $('.nbext-selector');
        if (selector.find('li.active').first().hasClass('disabled')) {
            selector.find('li:not(.disabled):visible a').first().click();
        }
    }