function identifier_attribution_submit(e) {
        var dialog = $(this).closest(".ui-dialog").find(".ui-dialog-content");
        var form = $(this).find("form");
        var data = form.serialize();
        $.ajax({
            type: "POST",
            url: form.attr('action'),
            data: data,
            datatype: 'json',
            success: function(data) {
                if (data.success) {
                    $('#actor_identifier_widget_container').html(data.message);
                    dialog.dialog("close");
                } else {
                    if (data.message) {
                        var message = form.find(".message");
                        message.show().css('display', 'table');
                        message.html(data.message);
                    }
                }
            }
        });
    }