function drawCell(x,y,color){
			var index = y*mapWidth + x;
			changeMap[index] = false;

			x=x*gridsize;
			y=y*gridsize;
			var g = gridsize;
			if (showGrid){
				x++; y++; g-=2;
			}
			

			ctx.clearRect(x,y,g,g);
			
			if (typeof color === "string"){
				ctx.fillStyle = color;
				ctx.fillRect(x,y,g,g);
			}else{
				fontMed.write(ctx,""+color,x,y);
				fontMed.write(ctx,""+color,x,y);
			}
			
		}