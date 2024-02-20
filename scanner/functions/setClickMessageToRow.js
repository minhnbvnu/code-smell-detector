function setClickMessageToRow(table, selector) {
    selector.off('click');
    selector.on('click', '> li', getClickLiSelectFunction(table));
    selector.on('click', 'a.ui-icon-circle-close', getRemoveLiSelectFunction(table));
}