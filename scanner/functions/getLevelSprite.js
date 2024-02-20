function getLevelSprite(_level){
			_level = _level||level;
			if (levelSprites[_level]) return levelSprites[_level];

			var levelWidth = 40;
			var levelHeight = 15;
			var row = Math.floor((_level-1)/5);
			var col = (_level-1) - row*5;
			var x = 1 + col*(levelWidth+1);
			var y = 1 + row*(levelHeight+1);
			var _canvas = document.createElement("canvas");
			_canvas.width = levelWidth;
			_canvas.height = levelHeight;
			var _ctx = _canvas.getContext("2d");
			var base = host.Y.getImage("Nibbles.levels");
			_ctx.drawImage(base,x,y,levelWidth,levelHeight,0,0,levelWidth,levelHeight);
			levelSprites[_level] = _canvas;
			return _canvas;
		}