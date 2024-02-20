function scaleColumns(columns, freeSpace, colWidth, shrinkCols){
			var oversizeCols = [],
			oversizeSpace = 0,
			remainingSpace = 0,
			nextColWidth = 0,
			remainingFlexGrowUnits = flexGrowUnits,
			gap = 0,
			changeUnits = 0,
			undersizeCols = [];

			function calcGrow(col){
				return (colWidth * (col.column.definition.widthGrow || 1));
			}

			function calcShrink(col){
				return  (calcWidth(col.width) - (colWidth * (col.column.definition.widthShrink || 0)));
			}

			columns.forEach(function(col, i){
				var width = shrinkCols ? calcShrink(col) : calcGrow(col);
				if(col.column.minWidth >= width){
					oversizeCols.push(col);
				}else {
					if(col.column.maxWidth && col.column.maxWidth < width){
						col.width = col.column.maxWidth;
						freeSpace -= col.column.maxWidth;

						remainingFlexGrowUnits -= shrinkCols ? (col.column.definition.widthShrink || 1) : (col.column.definition.widthGrow || 1);

						if(remainingFlexGrowUnits){
							colWidth = Math.floor(freeSpace/remainingFlexGrowUnits);
						}
					}else {
						undersizeCols.push(col);
						changeUnits += shrinkCols ? (col.column.definition.widthShrink || 1) : (col.column.definition.widthGrow || 1);
					}
				}
			});

			if(oversizeCols.length){
				oversizeCols.forEach(function(col){
					oversizeSpace += shrinkCols ?  col.width - col.column.minWidth : col.column.minWidth;
					col.width = col.column.minWidth;
				});

				remainingSpace = freeSpace - oversizeSpace;

				nextColWidth = changeUnits ? Math.floor(remainingSpace/changeUnits) : remainingSpace;

				gap = scaleColumns(undersizeCols, remainingSpace, nextColWidth, shrinkCols);
			}else {
				gap = changeUnits ? freeSpace - (Math.floor(freeSpace/changeUnits) * changeUnits) : freeSpace;

				undersizeCols.forEach(function(column){
					column.width = shrinkCols ? calcShrink(column) : calcGrow(column);
				});
			}

			return gap;
		}