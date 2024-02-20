function setCell(x,y,v){
			var index = y*mapWidth + x;
			v=v||0;
			changeMap[index] = true;
			map[index] = v;
		}