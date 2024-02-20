function startUpload(progress, isValidateOnly) {
    if(isValidateOnly === true) {
        progress.find('#summary').prepend("<li>" + getDateString() + ": Started validating rows.</li>");
    } else {
        progress.find('#summary').prepend("<li>" + getDateString() + ": Started uploading rows.</li>");
    }
}