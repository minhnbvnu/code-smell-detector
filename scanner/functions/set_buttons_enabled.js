function set_buttons_enabled (extension, state) {
        state = (state === true);

        extension.selector_link.find('.nbext-enable-toggle').toggleClass('nbext-enabled', state);

        var btns = $(extension.ui).find('.nbext-enable-btns').children();
        btns.eq(0)
            .prop('disabled', state)
            .toggleClass('btn-default disabled', state)
            .toggleClass('btn-primary', !state);
        btns.eq(1)
            .prop('disabled', !state)
            .toggleClass('btn-default disabled', !state)
            .toggleClass('btn-primary', state);
        if (extension.unconfigurable) {
            var forget_btn = btns.eq(2);
            if (state) {
                forget_btn.remove();
            }
            else if (forget_btn.length < 1) {
                $('<button/>')
                    .text('Forget')
                    .attr('type', 'button')
                    .addClass('btn btn-warning ')
                    .on('click', handle_forget_click)
                    .insertAfter(btns.eq(1));
            }
        }
    }