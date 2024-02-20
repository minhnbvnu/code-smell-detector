function setupDialogs() {
    $('*[data-dialog]').click(function(e) {
        e.preventDefault();
        var dialog = $(e.currentTarget).attr('data-dialog');

        $('#dialog-'+dialog).toggleClass('active');
    });

    $(document).keyup(function(e) {
        if (e.keyCode == 27) $('.dialog-container').removeClass('active');
    });
}