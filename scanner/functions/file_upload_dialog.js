function file_upload_dialog(e) {
    var dialog = $(this);
    var form = dialog.find("form");

    if (form.find(".toggle_upload_type").length) {
    // Simpler way to toggle file upload dialog widgets based on file or meta upload type
    // classes are defined in forms...
    // thunk().thunk().thunk()
    form.on('change', ".toggle_upload_type", function(e) {
        if ($(this).prop('checked')) {
            var type = $(this).attr('id');
            var form = $(this).closest("form");
            // Hide and disable the inputs so they are not serialized
            form.find(".id_upload_type_0").attr("disabled",true).closest("tr").hide();
            form.find(".id_upload_type_1").attr("disabled",true).closest("tr").hide();
            // Enable the type that is active
            form.find("." + type).attr("disabled",false).closest("tr").show();
        }
        });

    // If one is already set, should just trigger change...
    if (form.find('#id_upload_type_0').prop('checked')) {
        form.find('#id_upload_type_0').trigger('change');
    } else if (form.find('#id_upload_type_1').prop('checked')) {
        form.find('#id_upload_type_1').trigger('change');
    } else { // Set the initial view to File Upload
        form.find('#id_upload_type_0').prop('checked',true);
        form.find('#id_upload_type_0').trigger('change');
    }

    // Client side fix for the django forms issue mentioned in samples/forms.py
    form.find("input.required").closest("tr").addClass("required");
    }

    // XXXXXXXXX THIS NEEDS SOME FIXING.

    //setup "AJAX" file uploading
    // inspired by http://blog.manki.in/2011/08/ajax-fie-upload.html

    // Previously this was loaded at ready(), the selector could be more targetted given
    // use as a callback now..
    $('.file-submit-iframe').load(function(e) {
        var $curTar = $(e.currentTarget);
        var response = this.contentDocument.body.innerHTML;
        if (!response) {
            return;
        }

        try {
           response = $.parseJSON($.parseJSON(response));
        } catch (err) {
            //Server errors will cause JSON not to be able to parse
            //  the response. Show the user an error message so
            //  they know what happened.
            /*var dlg = $('<html></html>').append($(response))
                .dialog({
                    modal:true,
                    width:window.screen.width/2,
                    height:window.screen.height/2
                });*/
            response = {'message': 'Error uploading file.', 'success': false}
        }

        //clear the content of the iframe
        this.contentDocument.body.innerText = '';

        //handle the return value
    var dialog = $curTar.closest(".ui-dialog");
    var item_type = $(dialog).find('form').attr('item-type');
        if (!response.success && response.form) {
            re_render_form(dialog, response.form, e);
        }

        if (response.message) {
            display_server_msg(response.message, dialog);
        } else {
            clear_server_msg(dialog);
        }

        // If we are being told to redirect, do so.
        if (response.redirect_url) {
            document.location = response.redirect_url;
        }

    // XXX TODO: Make this more general for special dialog callbacks, etc..
        if (item_type == "object" || item_type == "object-static") {
            $curTar.parent('form').find('.object-types').change();
            if (response.success)
                post_add_patchup($curTar.parent('form'), response);
        }
    form.trigger("fileUploadComplete", response);

    })
    .parent('form').submit(function(e) {
        //Show progress message when files are uploading
        display_server_msg('Uploading File...', $(e.currentTarget).closest('.ui-dialog'));
    });
}