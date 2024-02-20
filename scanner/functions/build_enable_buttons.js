function build_enable_buttons () {
        var div_buttons = $('<div class="btn-group nbext-enable-btns"/>');

        $('<button/>')
            .text('Enable')
            .attr('type', 'button')
            .addClass('btn btn-primary')
            .on('click', handle_buttons_click)
            .appendTo(div_buttons);

        $('<button/>')
            .text('Disable')
            .attr('type', 'button')
            .addClass('btn btn-default')
            .on('click', handle_buttons_click)
            .prop('disabled', true)
            .appendTo(div_buttons);

        return div_buttons;
    }