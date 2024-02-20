function new_sample_dialog() {
    // Upload a related sample (Using the related dialog persona), used from events, samples
    // The action target takes care of passing the parent sample_id here
    if ($(this).dialog("persona") === "related") {
    $('id_related_md5, label[for="id_related_md5"]').closest("tr").hide();
    $('#id_related_md5').prop('value', '');
    $('#id_inherit_sources').prop('checked', true);
    $('#id_inherit_campaigns').prop('checked', true);
    }
    else {
    $('id_related_md5, label[for="id_related_md5"]').closest("tr").show();
    $('#id_related_md5').prop('value', '');
    $('#id_inherit_sources').prop('checked', false);
    $('#id_inherit_campaigns').prop('checked', false);
    }
}