function getCreateRowHandler(tableName) {
    return function(index, amount) {
        var progress = $('#' + tableName + '_progress');

        upateLiRowText(progress.find('#errors > li'), index, amount, "insert");
        upateLiRowText(progress.find('#duplicates > li'), index, amount, "insert");
        upateLiRowText(progress.find('#local_duplicates > li'), index, amount, "insert");
        upateLiRowText(progress.find('#messages > li'), index, amount, "insert");

        if(tableName === defaultTableName) {
            $("#update-" + tableName + "-table").button({disabled: true});
            $("#validate-" + tableName + "-table").button({disabled: false});
        }
    };
}