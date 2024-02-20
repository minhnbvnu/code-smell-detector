function getTableWidth(editor, needIEHack, defaultValue) {
        var body = editor.body;
        return body.offsetWidth - (needIEHack ? parseInt(domUtils.getComputedStyle(body, 'margin-left'), 10) * 2 : 0) - defaultValue.tableBorder * 2 - (editor.options.offsetWidth || 0);
    }