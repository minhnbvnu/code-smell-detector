function setupLinks() {
    $('a').click(function(e) {
        var $a = $(e.currentTarget);
        var val = decodeURIComponent($a.attr('href'));

        if (val.indexOf('tel:') === 0) {
            e.preventDefault();
            $('#dialog-dial').addClass('active')
                .find('.dial-input')
                .val(val.slice('tel:'.length));

        } else if (val.indexOf('sms:') === 0) {
            e.preventDefault();
            $('#dialog-sms').addClass('active')
                .find('.dial-input')
                .val(val.slice('tel:'.length));
        }
    })
}