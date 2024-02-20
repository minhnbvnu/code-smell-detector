function edit_case_summary() {
    $('#container_editor_summary').toggle();
    if ($('#container_editor_summary').is(':visible')) {
        $('#ctrd_casesum').removeClass('col-md-12').addClass('col-md-6');
        $('#summary_edition_btn').show(100);
        $("#sum_refresh_btn").html('Save');
        $("#sum_edit_btn").html('Close editor');
    } else {
        $('#ctrd_casesum').removeClass('col-md-6').addClass('col-md-12');
        $('#summary_edition_btn').hide();
        $("#sum_refresh_btn").html('Refresh');
        $("#sum_edit_btn").html('Edit');
    }
}