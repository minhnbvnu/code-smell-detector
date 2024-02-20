function moveToMark() {
                var mark = editor.popEmacsMark();
                mark && editor.moveCursorToPosition(mark);
            }