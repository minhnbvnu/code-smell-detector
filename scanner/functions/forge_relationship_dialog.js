function forge_relationship_dialog(e) {
        var dialog = $(this);
        var form = dialog.find("form");
        var widget = dialog.dialog("activatedBy");  // dialog-persona saves the element that opened the dialog
        get_stored_item_data(get_item_data_url);
        if (!form.attr("_dialog_once")) {
            $('<button>Get Clipboard</button>').click(function(e) {
                e.preventDefault();
                get_stored_item_data(get_item_data_url);
                $('input#id_dest_id').val(readCookie('crits_rel_id'));
                $('select#id_reverse_type').val(readCookie('crits_rel_type'));
            })
            .insertAfter("#id_dest_id");
            if (widget) {
                $("#form-forge-relationship #id_forward_type").val( widget.attr("data-type") ); // rel_type_escaped).attr('selected', true);
                $("#form-forge-relationship #id_forward_value").val( widget.attr("data-value") ); // rel_value_escaped);
            } else {
            	log("JS ERROR: did not have activatedBy element stored");
            }
            createPickers();
        }
        form.attr("_dialog_once", true);
    }