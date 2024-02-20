function update_dialog(e) {
    var dialog = $(this);
    var form = dialog.find("form");
    var elem = dialog.dialog("activatedBy");  // dialog-persona saves the element that opened the dialog

    var cur_data_tds = elem.parent().siblings();

    // allow this function to be used by objects that don't want to
    // replace the old item after "edit" (This is the case with
    // comments, where we use essentially the same functionality for
    // replying as for editing, but obviously don't want to replace
    // the replied-to comment.)

    var replace = elem.attr("replace"); // Should this just tell us the element to replace?
    if (replace !== 'false' && (replace || replace === undefined ) ) {
    //save this item's location in the listing so we can replace it after edit
    var loc;

        //this is icky... :(
        //find the position of the parent tr so we can replace it
        // The tr is at a different level for comment rows.
        var parent = cur_data_tds.parentsUntil('tr').parent('tr');
        if (!parent.length) {
            parent = cur_data_tds.parent();
        }
        loc = parent.index();

    dialog.data("crits", {updateloc: loc});
    }

    // Give the form a placeholder for extra data fields if not already there.
    var dataelem = cur_data_tds.find(".extradata").filter("[data-field]");
    $.each(dataelem, function(k,v) {
            var field = $(v).attr("data-field");
            var value = $(v).text();

            if (!form.find("[name='" + field + "']").length) {
            form.append("<input type='hidden' name='" + field + "' value=''>");
            }
        });

    // get the form's inputs
    var inputs = form.find('input,select,textarea');
    var sel_val = null;

    // pre-populate form
    inputs.each(function(index) {
        var input = $(this);
        var field = input.attr('name');
        var value;

        // map input to table cell with "data-field" (changed from class) matching input name
        // first look at the top level
        // skip any fields with class of "no_edit" to allow static values to persist
        var data_elem = cur_data_tds.filter("[data-field='" + field + "']").not(".no_edit");

        if (!data_elem.length) {
            //look at child elems if not in the top level
            data_elem = cur_data_tds.find("[data-field='" + field + "']");
        }

    if (data_elem.length) { // some fields are set by default on page request and don't
                // need to be set here set here
        if (field == 'comment') { // Only for editing comments
            var value = data_elem.html(); // Get the HTML version
            value = value.replace(/<br>/g, '\n'); // Preserve newlines
        } else { //Everything else
            var value = data_elem.text();
        }
        if (field == 'action_type') {
            sel_val = value;
        }
        if (input.attr('type') == 'radio') {
            // check the correct radio element
            input.filter('[value="'+value+'"]').prop('checked', true);
        } else {
            // handle empty analysis fields (default to current user)
            if (field == 'analyst' && !value) {
                input.val(username);                // defined in base.html
            } else {
                input.val(value.trim());
            }
        }
        }
     });
    var sel = form.find('#id_action_type');
    if (typeof sel !== "undefined") {
        if (typeof subscription_type !== "undefined") {
            $.ajax({
                type:'GET',
                data: {type: subscription_type},
                url: get_actions_for_tlo,
                success: function(data) {
                    $.each(data.results, function(x,y) {
                        sel.append($('<option></option>').val(y).html(y));
                    });
                    sel.find('option[value="' + sel_val + '"]').attr('selected', true);
                    sel.attr('disabled', true);
                }
            });
        }
    }
}