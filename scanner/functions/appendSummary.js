function appendSummary(result, isValidateOnly, messages, detailedMessages, progress) {
    if (messages.length > 0) {
        for(var counter = 0; counter < result.messages.length; counter++) {
            messages.prepend("<li>" + result.messages[counter] + "</li>");
        }
    } else if(detailedMessages.length > 0) {
        if(isValidateOnly === false) {
            if(result.failedRows.length === 0 && result.successfulRows.length > 0) {
                detailedMessages.prepend("<p>All " + result.successfulRows.length + " rows successfully uploaded.</p>");
            }
            else {
                detailedMessages.prepend("<p>Successfully uploaded " + result.successfulRows.length + " rows.</p>");
            }
        }
        else {
            if(result.failedRows.length === 0 && result.successfulRows.length > 0) {
                detailedMessages.prepend("<p>All " + result.successfulRows.length + " rows successfully validated.</p>");
            }
            else {
                detailedMessages.prepend("<p>" + result.successfulRows.length + " rows successfully passed validation.</p>");
            }
        }
    }
}