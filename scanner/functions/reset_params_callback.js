function reset_params_callback (evt) {
        evt.stopPropagation(); // don't want to toggle visibility too!
        var btn = $(evt.target);
        if (btn.children('.fa').length < 1) {
            btn.addClass('disabled');
            btn.children('.fa').addClass('fa-spin');
        }
        var extension = btn.closest('.nbext-ext-row').data('extension');
        reset_params(extension).then(function () {
            btn.removeClass('disabled');
            btn.children('.fa').removeClass('fa-spin');
        });
    }