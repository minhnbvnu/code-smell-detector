function toggleDragButton(show, table, editor) {
        if (!show) {
            if (dragOver)return;
            dragButtonTimer = setTimeout(function () {
                !dragOver && dragButton && dragButton.parentNode && dragButton.parentNode.removeChild(dragButton);
            }, 2000);
        } else {
            createDragButton(table, editor);
        }
    }