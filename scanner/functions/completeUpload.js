function completeUpload(table, tableName, progress, totalRows, isValidateOnly, linkData) {
    var errors = progress.find('#errors');
    var duplicates = progress.find('#duplicates');
    //var localDuplicates = progress.find('#local_duplicates');

    if(typeof linkData !== "undefined") {
        table.handsontable("setDataAtCell", linkData, "ignore");
    }

    if(isValidateOnly === true) {
        progress.find('#initial').html("Finished validating all rows.");
        progress.find('#summary').prepend("<li>" + getDateString() + ": Finished validating all rows.</li>");
    } else {
        progress.find('#initial').html("Finished uploading all rows.");
        progress.find('#summary').prepend("<li>" + getDateString() + ": Finished uploading all rows.</li>");
    }

    if(errors.find('> li').length > 0) {
        var removeErrorsLink = $('<a/>').attr('href', '#').addClass('remove-errors').text('Remove Rows With Errors');
        removeErrorsLink.button();
        removeErrorsLink.css("color", 'red');

        removeErrorsLink.on('click', function() {
            var isConfirm = window.confirm("Are you sure you want to remove ALL rows with errors?");
            if (isConfirm === true)
            {
                errors.empty();
                removeRowsErrorsAll(table);
            }
        });

        errors.prepend(removeErrorsLink);
    } else if(isValidateOnly && table.handsontable("countEmptyRows") < table.handsontable("countRows")) {
        $("#update-" + tableName + "-table").button({disabled: false});
    }

    if(duplicates.find('> li').length > 0) {
        var removeDuplicatesLink = $('<a/>').attr('href', '#').addClass('remove-duplicates').text('Remove Duplicate Rows');
        removeDuplicatesLink.button();
        removeDuplicatesLink.css("color", 'red');

        removeDuplicatesLink.on('click', function() {
            var isConfirm = window.confirm("Are you sure you want to remove ALL rows that are detected to already be in CRITs?");
            if (isConfirm === true)
            {
                duplicates.empty();
                removeRowsServerDuplicateAll(table);
            }
        });

        duplicates.prepend(removeDuplicatesLink);
    }

    /*if(localDuplicates.find('> li').length > 0) {
        var removeDuplicatesLink = $('<a/>').attr('href', '#').addClass('remove-duplicates').text('Remove Local Duplicate Rows');
        removeDuplicatesLink.button();
        removeDuplicatesLink.css("color", 'red');

        removeDuplicatesLink.on('click', function() { removeRowsLocalDuplicateAll(table); });

        localDuplicates.prepend(removeDuplicatesLink);
    }*/

    updateResultsCounts(progress);

    $("#validate-" + tableName + "-table").button({disabled: true});
}