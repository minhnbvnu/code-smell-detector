function edit_rfiles(rfiles_id) {
    url = 'evidences/' + rfiles_id + '/modal' + case_param();
    $('#modal_add_rfiles_content').load(url, function (response, status, xhr) {
        hide_minimized_modal_box();
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }

        g_evidence_desc_editor = get_new_ace_editor('evidence_description', 'evidence_desc_content', 'target_evidence_desc',
                            function() {
                                $('#last_saved').addClass('btn-danger').removeClass('btn-success');
                                $('#last_saved > i').attr('class', "fa-solid fa-file-circle-exclamation");
                                $('#submit_new_evidence').text("Unsaved").removeClass('btn-success').addClass('btn-outline-warning').removeClass('btn-outline-danger');
                            }, null);

        g_evidence_desc_editor.setOption("minLines", "6");
        preview_evidence_description(true);

        let headers = get_editor_headers('g_evidence_desc_editor', null, 'evidence_edition_btn');
        $('#evidence_edition_btn').append(headers);
        
        load_menu_mod_options_modal(rfiles_id, 'evidence', $("#evidence_modal_quick_actions"));

        load_evidence_type();
        
        $('#modal_add_rfiles').modal({ show: true });

        edit_in_evidence_desc();
    });
}