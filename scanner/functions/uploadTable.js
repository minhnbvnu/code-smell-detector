function uploadTable(tableName, validateLocalColumns, isValidateOnly, appendDict, url) {
    var ht = $('#handsontable_' + tableName).handsontable('getInstance');
    var table = $('#handsontable_' + tableName);
    var progress = $('#' + tableName + '_progress');
    var errors = $('#' + tableName + '_errors');
    var isShowIcons = false;

    if(errors.length === 0) {
        errors = progress.find('#errors');

        // only show icons for main tables, inline tables do not need icons.
        isShowIcons = true;
    }

    var cleanedDataArray = getCleanedData(table, appendDict);
    var totalRows = cleanedDataArray.length;

    var validateDomainFunction = getDetectDuplicatesFunction();

    clearTableFormatting(table, progress, errors, totalRows);

    // do local data validation if validateLocalColumns data is available
    if(typeof validateLocalColumns !== "undefined" && validateLocalColumns !== null) {
        validateLocalData(table, progress, validateDomainFunction, cleanedDataArray, validateLocalColumns);
    }

    startUpload(progress, isValidateOnly);
    var offset = 0;
    var linkData = [];

    // do batch upload of data in chunks
    while(cleanedDataArray.length > 0) {
        requestArray = cleanedDataArray.splice(0, 50);
        ajaxRequest = createUploadAjaxQuery(table, url, isValidateOnly, requestArray, offset, progress, errors, isShowIcons, linkData);
        ajaxManager.addReq(ajaxRequest);

        offset += requestArray.length;
    }

    ht.render();

    ajaxManager.setCompleteCallback(completeUpload, [table, tableName, progress, totalRows, isValidateOnly, linkData]);
    ajaxManager.run();
}