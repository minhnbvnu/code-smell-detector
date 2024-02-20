function upload_new_signature_version_dialog(e) {
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
            form.find("#id_title").val($('#signature_title').attr('data-title'));
            //data_type
            form.find("#id_data_type").val($('#signature_type').text());
            //data_type
            if($('#data_type_min_version').text()!=="Click to edit") {
                form.find("#id_data_type_min_version").val($('#data_type_min_version').text());
             } else {
                form.find("#id_data_type_min_version").val("");
             }
            //data_type
            if($('#data_type_max_version').text()!=="Click to edit") {
                form.find("#id_data_type_max_version").val($('#data_type_max_version').text());
            } else {
                form.find("#id_data_type_max_version").val("");
            }

            //data_type_dependency
            //Convert to list to display, make sure it's only data_type_dependency and not buckets
            var dep_text_array = [];
            $.each($('.tagit-label'), function(id,val) {
                if($(val).closest("span").attr("id")==="data_type_dependency") {
                    if($(val).text()) {
                        dep_text_array.push($(val).text());
                    }
                }
            });
            for(var i = 0; i< dep_text_array.length; i++)
            {
                form.find("#id_data_type_dependency").tagit("createTag", dep_text_array[i]);
            }

            //description
            if($('#object_description').text()!=="Click to edit") {
                form.find("#id_description").val($('#object_description').text());
            } else {
                form.find("#id_description").val("");
            }
            //data
            if($('#object_data').text()!=="Click to edit") {
                form.find("#id_data").val($('#object_data').text());
            } else {
                form.find("#id_data").val("");
            }
            //copy relationships
            form.find("#id_copy_relationships").prop('checked', true);
            //source
            //bucket_list
            //Modified for only bucket_list <ul id='bucket_list'>
            var buckets = "";
            $.each($('.tagit-label'), function(id,val) {
                //Date type dependency also holds tagit, we don't want to add that to the buckets
                //The UL of signature_detail of the bucket_list ID is "bucket_list"
                if($(val).closest("ul").attr("id")==="bucket_list")
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