function updateColumnHeader(e,o,t){if(initialized){var n=getColumnIndex(e);if(null!=n){var l=columns[n],r=$headers.children().eq(n);r&&(void 0!==o&&(columns[n].name=o),void 0!==t&&(columns[n].toolTip=t),trigger(self.onBeforeHeaderCellDestroy,{node:r[0],column:l,grid:self}),r.attr("title",t||"").children().eq(0).html(o),trigger(self.onHeaderCellRendered,{node:r[0],column:l,grid:self}))}}}