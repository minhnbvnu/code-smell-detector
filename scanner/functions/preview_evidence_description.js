function preview_evidence_description(no_btn_update) {
    if(!$('#container_evidence_description').is(':visible')) {
        evidence_desc = g_evidence_desc_editor.getValue();
        converter = get_showdown_convert();
        html = converter.makeHtml(do_md_filter_xss(evidence_desc));
        evidence_desc_html = do_md_filter_xss(html);
        $('#target_evidence_desc').html(evidence_desc_html);
        $('#container_evidence_description').show();
        if (!no_btn_update) {
            $('#evidence_preview_button').html('<i class="fa-solid fa-eye-slash"></i>');
        }
        $('#container_evidence_desc_content').hide();
    }
    else {
        $('#container_evidence_description').hide();
         if (!no_btn_update) {
            $('#evidence_preview_button').html('<i class="fa-solid fa-eye"></i>');
        }

        $('#evidence_preview_button').html('<i class="fa-solid fa-eye"></i>');
        $('#container_evidence_desc_content').show();
    }
}