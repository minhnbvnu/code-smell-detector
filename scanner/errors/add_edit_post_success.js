function add_edit_post_success(data,dialog,loc,item_type,e,final_callback) {
    form = dialog.find("form");

    if (data.success) {
    form.find('ul.errorlist').remove(); // Clear any errors now, if they still exist we'll get a new form back
    //update listing with new item
    var new_i = $(data.html);
    var listing_type = item_type;
    //if this is a static form (e.g., the "Tools" tab on samples/details), make sure we
    if (data.inline) {
        append_inline_comment(data);
        if (data.message) {
            display_server_msg(data.message, dialog); // item_type);
        }
        return;
    }
    //  update the main listing
    var idx = item_type.indexOf('-static');
    if (idx != -1) {
        listing_type = item_type.substring(0, idx);
    }
    var listing = $('#'+listing_type+'_listing tbody');
    if (listing.length && listing_type != "indicator") {
        //  replace old item with new if 'edit'
        if (loc !== null && loc !== undefined) {
        listing.find('tr').eq(loc).replaceWith($(new_i));
        } else { //'add', so add new item to list
        //if collapsible, replace the entire object

        //NOTE: we're assuming that collapsible lists have their Add button
        //  somewhere other than the end of the listing.  If that assumption changes
        //  in the future, this code will need to be modified.  This may be a good
        //  instance variable if we end up converting these helper functions into
        //  (a) jQuery plugin(s).

        if (data.header) {
            listing = listing.find('tr');
            //find list to replace
            var added = listing.find('[data-field="'+data.data_field+'"]:contains("'+data.header+'")').parentsUntil('table','tr').prev().remove().end().replaceWith($(new_i));
            if (!added.length) { //nothing to replace; this is the first of its type

            // make sure it's before the "OTHER" item if that item exists
            //n(currently used only for non-allowed sources)

            // NOTE: again, this may be a good candidate for an instance
            // variable (something like a boolean indicating whether the "OTHER"
            // object may exist).
            var other = listing.find('.other_'+item_type);
            if (!other.size()) { //check if at the top level
                other = listing.filter('.other_'+item_type);
            }
            if (!other.size()) { //doesn't exist; put before "Add" button
                listing.last().after($(new_i));
            } else { //place before "OTHER" item
                other.before($(new_i));
            }
            }
            // XXXX Why Collapse? Show them what they did
            collapse();
        } else {
            // dirty hack for determining if this is a comment on the aggregate page
            if (item_type == "comment" && !$('#add_comment').length) {

            // aggregate comments are listed in reverse order (order would be a
            // good instance variable...)
            listing.find('tr').first().before($(new_i));
            } else {
            var tmp_lst = listing.find('tr');
            //if this is the first we're adding
            if (!tmp_lst.length) {
                listing.append($(new_i));
                //also show the header
                listing.prev('thead').find('tr').show();
            } else {
                tmp_lst.last().after($(new_i));
            }
            }

            incrementCount(listing.closest('div'), 1);
        }
        }

        clear_form(dialog);
        set_date_field(form);

        // If we we just did an update and it was successful, close it.
        if (dialog.hasClass("ui-dialog-content") && dialog.dialog("persona") == "update") {
        dialog.dialog("close");
        }

        //close the dialog only if we're on a listing page. Otherwise we want to
        //  provide a link for redirecting to the details page.
        //$('#add-'+item_type+'-form').dialog('close');
    }
    } else if (data.form) {
    re_render_form(dialog, data.form, e);
    }

    if (data.message) {
    form.trigger("addEditSubmitComplete");
    display_server_msg(data.message, dialog); // item_type);
    }

    if (final_callback && typeof(final_callback) == "function") {
        final_callback();
     }
}