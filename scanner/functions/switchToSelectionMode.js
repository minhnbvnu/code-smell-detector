function switchToSelectionMode() {
        longTouchTimer = null;
        clearTimeout(longTouchTimer);
        editor.selection.moveToPosition(pos);
        var range = clickCount >= 2
            ? editor.selection.getLineRange(pos.row)
            : editor.session.getBracketRange(pos);
        if (range && !range.isEmpty()) {
            editor.selection.setRange(range);
        } else {
            editor.selection.selectWord();
        }
        mode = "wait";
    }