function upload_new_version_dialog(e) {
    var dialog = $(this);
    var form = dialog.find("form");
    var widget = dialog.dialog("activatedBy");
    var copy_rels = '<tr><th><label for="id_copy_relationships">Copy relationships:</label></th><td><input id="id_copy_relationships" name="copy_relationships" type="checkbox"></td></tr>';

    if (!form.find("#id_copy_relationships").length) {
        form.find("#id_data").closest('tr').after(copy_rels);
    };

    if (!form.attr("_dialog_once")) {
        copy_button = {'Copy Data From Current Version': function() {
            //title
            form.find("#id_title").val($('#raw_data_title').attr('data-title'));
            //tool name
            form.find("#id_tool_name").val($('#raw_data_tool_name').text());
            //tool version
            form.find("#id_tool_version").val($('#raw_data_tool_version').text());
            //tool details
            form.find("#id_tool_details").val($('#raw_data_tool_details').text());
            //data_type
            form.find("#id_data_type").val($('#raw_data_type').text());
            //description
            form.find("#id_description").val($('#raw_data_description').text());
            //copy relationships
            form.find("#id_copy_relationships").prop('checked', true);
            //source
            //bucket_list
            var buckets = "";
            $.each($('.tagit-label'), function(id,val) {
                buckets = buckets + $(val).text() + ", ";
            });
            if (buckets.length > 2) {
                buckets = buckets.substring(0, buckets.length - 2);
            }
            form.find("#id_bucket_list").val(buckets);
            //ticket
            var tickets = "";
            $.each($('#ticket_listing td[data-field="ticket_number"]'), function(id, val) {
                tickets = tickets + $(val).text() + ", ";
            });
            if (tickets.length > 2) {
                tickets = tickets.substring(0, tickets.length - 2);
            }
            form.find("#id_ticket").val(tickets);
        }};
        var buttons = dialog.dialog("option", "buttons");
        $.extend(copy_button, buttons);
        dialog.dialog("option", "buttons", copy_button);
    }
    form.attr("_dialog_once", true);
}