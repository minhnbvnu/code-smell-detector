function _doConvert() {
        var json = JSON.parse(editor.getValue());
        return convert(json, output);
    }