function canCellBeActive(e,o){if(!options.enableCellNavigation||e>=getDataLengthIncludingAddNew()||e<0||o>=columns.length||o<0)return!1;var t=data.getItemMetadata&&data.getItemMetadata(e);if(t&&void 0!==t.focusable)return!!t.focusable;var n=t&&t.columns;return n&&n[columns[o].id]&&void 0!==n[columns[o].id].focusable?!!n[columns[o].id].focusable:n&&n[o]&&void 0!==n[o].focusable?!!n[o].focusable:!!columns[o].focusable}