function cell(x,y){
			var index = y*mapWidth + x;
			return map[index] || 0;
		}