function details_copy_id (crits_type) {
    // Highlight the icon if we have it selected
    if (readCookie('crits_rel_id')) {
        $('button#'+readCookie('crits_rel_id')).css('background-color', '#1AC932');
    }
    $('button.id_copy').click(function() {
        createCookie('crits_rel_id',$(this).attr('id'),60);
        createCookie('crits_rel_type',crits_type,60);
        $('button#'+readCookie('crits_rel_id')).css('background-color', '#1AC932');
        get_stored_item_data(get_item_data_url);
    });
}