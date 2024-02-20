function jtRecordsLoaded(event,data, button) {
    var jtable = event.target;
    var jtTitle = $(jtable).data().hikJtable.options.title;

    if (button) {
        var inTab = $("#" + button);
        if (inTab) {
            inTab.find('span').html(jtTitle + " (" + data.serverResponse.TotalRecordCount + ")");
        }
    }

    if (data.serverResponse.term) {
        $(jtable).find('.jtable-title-text').html(jtTitle + " - " + data.serverResponse.term);
    }
    // When the table loads, highlight the icon if it is already stored
    $('span#'+readCookie('crits_rel_id') + '.id_copy').css('background-color', '#1AC932');
    // Set top bar information
    $(jtable).find('.id_copy').click(function() {
        // Uncolor the previous stored value's icon
        $('span#' + readCookie('crits_rel_id') + '.id_copy').css('background-color', '#D5DFE6');
        // Save the new value
        createCookie('crits_rel_id', $(this).attr('id'), 60);
        createCookie('crits_rel_type', data.serverResponse.crits_type, 60);
        // Adjust background
        $('span#' + readCookie('crits_rel_id') + '.id_copy').css('background-color', '#1AC932');
        get_stored_item_data(get_item_data_url);
    });
    // Light up the favorite icon for any that are favorites.
    favorites_list = user_favorites[data.serverResponse.crits_type];
    if (favorites_list) {
        for (var id = 0; id < favorites_list.length; id++) {
            $('span#' + favorites_list[id] + '.favorites_icon_jtable').css('background-color', '#1AC932').addClass('favorites_icon_active');
        }
    }

    // Also add an attribute for the data type.
    $(jtable).find('.favorites_icon_jtable').attr('data-type', data.serverResponse.crits_type);

    // Also add an attribute for the data type to the actions button
    $(jtable).find('.preferred_actions_jtable').attr('data-type', data.serverResponse.crits_type);
}