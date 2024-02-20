function onUploadFinished(file) {
    // // console.log("upload finished");
    // // console.log(file);
    this.removeFile(file);
    var cursorPos = document.getElementById("editable").selectionStart;
    var cursorEnd = document.getElementById("editable").selectionEnd;
    var v = document.getElementById("editable").value;
    var textBefore = v.substring(0, cursorPos);
    var textAfter = v.substring(cursorPos, v.length);
    var message = 'uploaded file';
    if (cursorEnd > cursorPos) {
        message = v.substring(cursorPos, cursorEnd);
        textAfter = v.substring(cursorEnd, v.length);
    }
    var prefix = '';
    if (file.type.startsWith("image")) {
        prefix = '!';
    }
    var extraText = prefix + '[' + file.xhr.getResponseHeader("Location").split('filename=')[1] + '](' +
        file.xhr.getResponseHeader("Location") +
        ')';

    var newLine = "\n"
    document.getElementById("editable").value = (
        textBefore +
        extraText +
        newLine +
        textAfter
    );

    console.log("SELECT LINK")
    // Select the newly-inserted link
    document.getElementById("editable").selectionStart = cursorPos + extraText.length + newLine.length;
    document.getElementById("editable").selectionEnd = cursorPos + extraText.length + newLine.length;
    // expand textarea
    autoExpand(document.getElementById("editable"));
    // trigger a save
    CY.contentEdited();
}