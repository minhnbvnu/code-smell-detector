function processAjaxError(data, textStatus, errorThrown, progress, errors, offset) {
    var summary = progress.find('#summary');

    summary.prepend("<li>" + getDateString() + ": Error encountered [Start row: " + (offset + 1) + "]</li>");
    summary.prepend("<li>    Status: " + textStatus + "</li>");
    summary.prepend("<li>    ErrorThrown: " + errorThrown + "</li>");
    errors.prepend("<li>" + getDateString() + ": Error encountered [Start row: " + (offset + 1) + "]</li>");
    errors.prepend("<li>    Status: " + textStatus + "</li>");
    errors.prepend("<li>    ErrorThrown: " + errorThrown + "</li>");

    console.log(data);

    updateResultsCounts(progress);
}