function getNextSpriteInPool() {

		if ( _spriteCount === _spritePoolLength ) {

			var sprite = new RenderableSprite();
			_spritePool.push( sprite );
			_spritePoolLength ++;
			_spriteCount ++;
			return sprite;

		}

		return _spritePool[ _spriteCount ++ ];

	}