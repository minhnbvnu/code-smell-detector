function parseResults(result, table, progress, errors, isValidateOnly, offset, isShowIcons, linkData) {

    var newlyProcessedRows = result.processed;
    var status = progress.find('#status');
    var summary = progress.find('#summary');
    var currentProcessed = parseInt(status.attr('data-processed'));
    var totalprocessed = currentProcessed + newlyProcessedRows;

    status.attr('data-processed', totalprocessed);
    summary.prepend("<li>" + getDateString() + ": Processed " + newlyProcessedRows + " rows. [Start row: " + (offset + 1) + "]</li>");

    appendSummary(result, isValidateOnly, progress.find('#messages'), errors, progress);
    parseFailedResults(result, table, errors, isShowIcons);
    parseSuccessfulResults(result, table, progress, isShowIcons, linkData, errors);

    updateResultsCounts(progress);

    table.handsontable('render');
}