function setupColumnSort(){$headers.click((function(e){if(!columnResizeDragging&&(e.metaKey=e.metaKey||e.ctrlKey,!$(e.target).hasClass("slick-resizable-handle"))){var o=$(e.target).closest(".slick-header-column");if(o.length){var t=o.data("column");if(t.sortable){if(!getEditorLock().commitCurrentEdit())return;for(var n=$.extend(!0,[],sortColumns),l=null,r=0;r<sortColumns.length;r++)if(sortColumns[r].columnId==t.id){(l=sortColumns[r]).sortAsc=!l.sortAsc;break}var i,a=!!l;options.tristateMultiColumnSort?(l||(l={columnId:t.id,sortAsc:t.defaultSortAsc}),a&&l.sortAsc&&(sortColumns.splice(r,1),l=null),options.multiColumnSort||(sortColumns=[]),!l||a&&options.multiColumnSort||sortColumns.push(l)):e.metaKey&&options.multiColumnSort?l&&sortColumns.splice(r,1):((e.shiftKey||e.metaKey)&&options.multiColumnSort||(sortColumns=[]),l?0===sortColumns.length&&sortColumns.push(l):(l={columnId:t.id,sortAsc:t.defaultSortAsc},sortColumns.push(l))),i=options.multiColumnSort?{multiColumnSort:!0,previousSortColumns:n,sortCols:$.map(sortColumns,(function(e){return{columnId:columns[getColumnIndex(e.columnId)].id,sortCol:columns[getColumnIndex(e.columnId)],sortAsc:e.sortAsc}}))}:{multiColumnSort:!1,previousSortColumns:n,columnId:sortColumns.length>0?t.id:null,sortCol:sortColumns.length>0?t:null,sortAsc:!(sortColumns.length>0)||sortColumns[0].sortAsc},!1!==trigger(self.onBeforeSort,i,e)&&(setSortColumns(sortColumns),trigger(self.onSort,i,e))}}}}))}