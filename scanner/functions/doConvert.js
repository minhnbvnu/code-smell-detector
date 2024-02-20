function doConvert() {
        var json;
        try {
            json = JSON.parse(editor.getValue());
        } catch (error) {
            alert("Error parsing json:\n" + error.stack);
            return;
        }

        convert(json, output);
    }