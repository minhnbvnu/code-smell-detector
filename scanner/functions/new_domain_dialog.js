function new_domain_dialog(e) {
    dialog = $(this).find("form"); // $("#form-new-domain");

    //setup the Add Domain form to display and hide fields properly
    //save on DOM lookups
    var ip_check = dialog.find('#id_add_ip');
    var ip_fields = dialog.find('.togglewithip').parents('tr');

    //define function for seeing source dropdown should be visible
    var toggle_source_visibility = function() {
    //definitely should hide if use domain source is checked
    if (dialog.find('#id_same_source').prop('checked')) {
        dialog.find('.togglewithipsource').parents('tr').hide();
            //otherwise, should show only if we're trying to add an ip
    } else if (ip_check.prop('checked')) {
        dialog.find('.togglewithipsource').parents('tr').show();
    }
    };

    //define function for seeing if ip fields should be visible
    var toggle_ip_visibility = function() {
    if (ip_check.prop('checked')) {
        ip_fields.show();
        toggle_source_visibility();
    } else {
        ip_fields.hide();
    }
    };

    //initialize with ip fields hidden
    toggle_ip_visibility();

    //setup checkbox events
    //just make form look neater if they don't want to add an IP
    dialog.find("#id_add_ip").change(toggle_ip_visibility);

    //don't require selecting a source if they want to use the same source as the domain
    // and initialize same source to true (will prob. be true in most cases...?)
    dialog.find("#id_same_source").change(toggle_source_visibility).prop('checked', true);

    //reinitialize ip date field (since this function can be called after page load)
    createPickers();

    // If there is selected text, default the value in the form
    check_selected('domain', dialog);

}