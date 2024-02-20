function generalRenderer(row, col) {
    let cellMeta = {};

    //company names
    if (col === 0) {
        cellMeta.colWidths = 150;
        cellMeta.renderer = safeHtmlRenderer;
    }

    return cellMeta;
}