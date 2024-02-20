function handleLongTap() {
        longTouchTimer = null;
        clearTimeout(longTouchTimer);
        var range = editor.selection.getRange();
        var inSelection = range.contains(pos.row, pos.column);
        if (range.isEmpty() || !inSelection) {
            editor.selection.moveToPosition(pos);
            editor.selection.selectWord();
        }
        mode = "wait";
        showContextMenu();
    }