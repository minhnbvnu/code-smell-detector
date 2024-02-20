function oppositeDirection(_direction){
			switch (_direction){
				case DIRECTION.LEFT: return DIRECTION.RIGHT;
				case DIRECTION.RIGHT: return DIRECTION.LEFT;
				case DIRECTION.UP: return DIRECTION.DOWN;
				case DIRECTION.DOWN: return DIRECTION.UP;
			}
		}