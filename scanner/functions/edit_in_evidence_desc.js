function edit_in_evidence_desc() {
    if($('#container_evidence_desc_content').is(':visible')) {
        $('#container_evidence_description').show(100);
        $('#container_evidence_desc_content').hide(100);
        $('#evidence_edition_btn').hide(100);
        $('#evidence_preview_button').hide(100);
    } else {
        $('#evidence_preview_button').show(100);
        $('#evidence_edition_btn').show(100);
        $('#container_evidence_desc_content').show(100);
        $('#container_evidence_description').hide(100);
    }
}