function onReadFile(e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
        try {
            font = opentype.parse(e.target.result);
            // fontFamily.innerHTML = font.familyName || this.files[0].name.replace(/\.[^/.]+$/, "");
            showErrorMessage('');
            onFontLoaded(font);
        } catch (err) {
            showErrorMessage(err.toString());
            throw (err);
        }
    };
    reader.onerror = function (err) {
        showErrorMessage(err.toString());
    };

    reader.readAsArrayBuffer(file);
}