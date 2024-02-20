function clearTableDragTimer() {
        tableDragTimer && clearTimeout(tableDragTimer);
        tableDragTimer = null;
    }