function getCellFromEvent(e){var o,t,n=$(e.target).closest(".slick-cell",$canvas);if(!n.length)return null;if(o=getRowFromNode(n[0].parentNode),hasFrozenRows){var l=n.parents(".grid-canvas").offset(),r=0;n.parents(".grid-canvas-bottom").length&&(r=options.frozenBottom?$canvasTopL.height():frozenRowsHeight),o=getCellFromPoint(e.clientX-l.left,e.clientY-l.top+r+$(document).scrollTop()).row}return t=getCellFromNode(n[0]),null==o||null==t?null:{row:o,cell:t}}