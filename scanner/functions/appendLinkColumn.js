function appendLinkColumn(table) {

    var linkColumnIndex = getColumnIndexFromName(table, LINK_COLUMN_NAME);

    if(linkColumnIndex === -1) {
        appendColumns(table, [{type: 'text', width: '30', renderer: getLinkRenderer() }], [LINK_COLUMN_NAME]);
    }

    return linkColumnIndex;
}