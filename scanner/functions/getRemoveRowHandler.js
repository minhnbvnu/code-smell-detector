function getRemoveRowHandler(tableName) {
    return function(index, amount) {
        var progress = $('#' + tableName + '_progress');

        removeObsoleteLiRows(progress.find('#errors > li'), index, amount);
        removeObsoleteLiRows(progress.find('#duplicates > li'), index, amount);
        removeObsoleteLiRows(progress.find('#local_duplicates > li'), index, amount);
        removeObsoleteLiRows(progress.find('#messages > li'), index, amount);

        upateLiRowText(progress.find('#errors > li'), index, amount, "remove");
        upateLiRowText(progress.find('#duplicates > li'), index, amount, "remove");
        upateLiRowText(progress.find('#local_duplicates > li'), index, amount, "remove");
        upateLiRowText(progress.find('#messages > li'), index, amount, "remove");

        updateResultsCounts(progress);

        if(tableName === defaultTableName) {
            $("#update-" + tableName + "-table").button({disabled: true});
            $("#validate-" + tableName + "-table").button({disabled: false});
        }
    };
}