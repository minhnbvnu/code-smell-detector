function getWidth(cell) {
        if (!cell)return 0;
        return parseInt(domUtils.getComputedStyle(cell, "width"), 10);
    }