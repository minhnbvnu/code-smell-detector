function updateCanvasWidth(e){var o,t=canvasWidth,n=canvasWidthL,l=canvasWidthR;((o=(canvasWidth=getCanvasWidth())!==t||canvasWidthL!==n||canvasWidthR!==l)||hasFrozenColumns()||hasFrozenRows)&&($canvasTopL.width(canvasWidthL),getHeadersWidth(),$headerL.width(headersWidthL),$headerR.width(headersWidthR),hasFrozenColumns()?($canvasTopR.width(canvasWidthR),$paneHeaderL.width(canvasWidthL),$paneHeaderR.css("left",canvasWidthL),$paneHeaderR.css("width",viewportW-canvasWidthL),$paneTopL.width(canvasWidthL),$paneTopR.css("left",canvasWidthL),$paneTopR.css("width",viewportW-canvasWidthL),$headerRowScrollerL.width(canvasWidthL),$headerRowScrollerR.width(viewportW-canvasWidthL),$headerRowL.width(canvasWidthL),$headerRowR.width(canvasWidthR),options.createFooterRow&&($footerRowScrollerL.width(canvasWidthL),$footerRowScrollerR.width(viewportW-canvasWidthL),$footerRowL.width(canvasWidthL),$footerRowR.width(canvasWidthR)),options.createPreHeaderPanel&&$preHeaderPanel.width(canvasWidth),$viewportTopL.width(canvasWidthL),$viewportTopR.width(viewportW-canvasWidthL),hasFrozenRows&&($paneBottomL.width(canvasWidthL),$paneBottomR.css("left",canvasWidthL),$viewportBottomL.width(canvasWidthL),$viewportBottomR.width(viewportW-canvasWidthL),$canvasBottomL.width(canvasWidthL),$canvasBottomR.width(canvasWidthR))):($paneHeaderL.width("100%"),$paneTopL.width("100%"),$headerRowScrollerL.width("100%"),$headerRowL.width(canvasWidth),options.createFooterRow&&($footerRowScrollerL.width("100%"),$footerRowL.width(canvasWidth)),options.createPreHeaderPanel&&($preHeaderPanel.width("100%"),$preHeaderPanel.width(canvasWidth)),$viewportTopL.width("100%"),hasFrozenRows&&($viewportBottomL.width("100%"),$canvasBottomL.width(canvasWidthL))),viewportHasHScroll=canvasWidth>=viewportW-scrollbarDimensions.width),$headerRowSpacerL.width(canvasWidth+(viewportHasVScroll?scrollbarDimensions.width:0)),$headerRowSpacerR.width(canvasWidth+(viewportHasVScroll?scrollbarDimensions.width:0)),options.createFooterRow&&($footerRowSpacerL.width(canvasWidth+(viewportHasVScroll?scrollbarDimensions.width:0)),$footerRowSpacerR.width(canvasWidth+(viewportHasVScroll?scrollbarDimensions.width:0))),(o||e)&&applyColumnWidths()}