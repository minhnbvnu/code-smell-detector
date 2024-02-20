function handleTouchOut(event){
			if (touchData.isTouchDown){
				handleTouchUp(event);
			}
		}