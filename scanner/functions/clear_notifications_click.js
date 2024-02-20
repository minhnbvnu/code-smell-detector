function clear_notifications_click(e) {
    e.preventDefault();
    var elem = $(e.currentTarget);
    $.ajax({
        type: 'POST',
        data: '',
        url: elem.attr('action'),
        success: function(data) {
            if (data.success) {
                $('.notifications').html(data.message);
            }
        }
    });
}