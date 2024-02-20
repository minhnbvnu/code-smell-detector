function placeNumber(){
			var v=1;
			var x,y;
			do{
				x= Math.floor(Math.random()*mapWidth);
				y= Math.floor(Math.random()*mapHeight);
				v = cell(x,y);
			}while (v);
			
			setCell(x,y,currentNumber);
		}