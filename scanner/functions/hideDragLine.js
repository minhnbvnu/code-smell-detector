function hideDragLine(editor) {
        if (mousedown)return;
        var line;
        while (line = editor.document.getElementById('ue_tableDragLine')) {
            domUtils.remove(line)
        }
    }