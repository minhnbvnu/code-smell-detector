function delete_notification_click(e) {
    e.preventDefault();
    var elem = $(e.currentTarget);
    $.ajax({
        type: 'POST',
        data: '',
        url: elem.attr('action'),
        success: function(data) {
            if (data.success) {
                elem.parent().parent().remove();
            }
        }
    });
}