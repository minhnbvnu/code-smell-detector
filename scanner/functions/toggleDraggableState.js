function toggleDraggableState(editor, draggable, dir, mousePos, cell) {
        try {
            editor.body.style.cursor = dir == "h" ? "col-resize" : dir == "v" ? "row-resize" : "text";
            if (browser.ie) {
                if (dir && !mousedown && !getUETableBySelected(editor)) {
                    getDragLine(editor, editor.document);
                    showDragLineAt(dir, cell);
                } else {
                    hideDragLine(editor)
                }
            }
            onBorder = draggable;
        } catch (e) {
            showError(e);
        }
    }