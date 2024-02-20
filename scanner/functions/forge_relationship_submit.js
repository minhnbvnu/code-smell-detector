function forge_relationship_submit(e) {
        // This submittion is pretty standard, it could fall under add_edit_submit with
        // callbacks for the success status.
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
                    $("#form-forge-relationship #id_rel_confidence").prop('selectedIndex',0);
                    $("#form-forge-relationship #id_rel_reason").val('');
                    $("#form-forge-relationship #id_dest_id").val('');
                    $("#form-forge-relationship #id_relationship_date").val('');
                    $('#relationship_box_container').parent().html(data.message);
                    dialog.dialog("close");
                } else {
                    if (data.message) {
                        var message = form.find(".message");
                        message.show().css('display', 'table');
                        message.html(data.message);
                    }
                }
                qtip_container_setup();
            }
        });
    }