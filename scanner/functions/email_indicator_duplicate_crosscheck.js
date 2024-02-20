function email_indicator_duplicate_crosscheck() {
	/* This is client side crosschecking of email fields to see
	 * if an indicator has been created. This is not needed
	 * right now since there is server-side validation though
	 * there might be a time when we would want to do client
	 * side processing to alleviate server load.
	 */
    var textTypeValueSet = {}

    $('#relationship_listing_table_indicator tbody tr').each(function() {
        // create a map of a map for a multi-key map
        var ind_value = $(this).attr('data-value')
        var ind_type = $(this).attr('data-type')

        if((typeof textTypeValueSet[ind_type] !== 'undefined')) {
            textTypeValueSet[ind_type][ind_value] = true
        } else {
            textTypeValueSet[ind_type] = {}
            textTypeValueSet[ind_type][ind_value] = true
        }
    })

    $('#email_listing_table tr').each(function() {
        var email_data_type = $(this).attr('data-type')
        if(email_data_type) {
            if(email_data_type in textTypeValueSet) {
                var value = $(this).find('span.header_value').text()
                if(value !== 'Click pencil to edit...') {
                    var iconNode = $(this).find('.indicator_from_object')

                    if(iconNode) {
                        if(value in textTypeValueSet[email_data_type]) {
                            var iconNode = $(this).find('.create-indicator')
                            var originalTitle = $(iconNode).prop('title')
                            $(iconNode).removeClass('ui-icon-plusthick').addClass('ui-icon-circle-plus')
                            %(iconNode).prop('title', originalTitle + ": Warning: Indicator might already exist")
                        }
                    }
                } else {
                    var iconNode = $(this).find('.create-indicator')
                    var originalTitle = $(iconNode).prop('title')
                    $(iconNode).removeClass('ui-icon-plusthick').addClass('ui-icon-alert')
                    %(iconNode).prop('title', originalTitle + ": Warning: A value should be supplied first")
                }
            }
        }
    })
}