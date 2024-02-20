function confirm_breakup_submit(e) {
        var dialog = $(this);
        var form = $("#form-confirm-breakup");
        var widget = dialog.dialog("activatedBy");  // dialog-persona saves the element that opened the dialog
        var trow = widget.closest("[rtype]");
        // Alternatively, this could be pushed hidden into the form and a normal serialization/submit
        var data = {
            reverse_type: trow.attr('rtype'),
            dest_id: trow.attr('rvalue'),
            my_type: trow.attr('mtype'),
            my_value: trow.attr('mvalue'),
            forward_relationship: trow.attr('frel'),
            relationship_date: trow.attr('rdate'),
            forge_date: trow.attr('fdate'),
        };
        $.ajax({
            type: "POST",
            url: dialog.find("form").attr('action'),
            data: data,
            datatype: 'json',
            success: function(data) {
                if (data.success) {
                    dialog.dialog( "close" );
                    $('#relationship_box_container').parent().html(data.message);
                } else {
                    dialog.find('.message').html('<font color="red">Breakup Unsuccessful! ' + data.message + '</font>');
                }
                qtip_container_setup();
            }
        });
    }