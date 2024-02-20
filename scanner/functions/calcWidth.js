function calcWidth(width){
			var colWidth;

			if(typeof(width) == "string"){
				if(width.indexOf("%") > -1){
					colWidth = (totalWidth / 100) * parseInt(width);
				}else {
					colWidth = parseInt(width);
				}
			}else {
				colWidth = width;
			}

			return colWidth;
		}