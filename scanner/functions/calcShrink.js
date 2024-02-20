function calcShrink(col){
				return  (calcWidth(col.width) - (colWidth * (col.column.definition.widthShrink || 0)));
			}