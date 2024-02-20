function handleTouchUp(event){

			if (!isTouched){
				if (Audio && Audio.checkState) Audio.checkState();
			}
			
			touchData.isTouchDown = false;

			if (event && event.touches){
				var touches = event.changedTouches;

				for (var i=0; i < touches.length; i++) {
					var touch = touches[i];
					endTouch(getTouchIndex(touch.identifier));
				}

				if (event.touches.length === 0){
					resetInput();
				}
			}else{
				endTouch(getTouchIndex("notouch"));
				resetInput();
			}

			function endTouch(touchIndex){
				if (touchIndex>=0){
					var thisTouch =touchData.touches[touchIndex];
					var deltaX = thisTouch.startX-thisTouch.x;
					var deltaY = thisTouch.startY-thisTouch.y;
					var distance = Math.sqrt( deltaX*deltaX + deltaY*deltaY );
					var clearSelection = true;
					if (thisTouch.UIobject){
						var elm = thisTouch.UIobject;
						if (elm.keepSelection) clearSelection = false;

						if (distance<8 && elm.onClick){
							elm.onClick(thisTouch);
						}

						if (elm.onTouchUp) elm.onTouchUp(thisTouch);
					}

					if (clearSelection && distance<8) UI.clearSelection();

					touchData.touches.splice(touchIndex, 1);
				}
			}

			function resetInput(){
				//Input.isDown(false);
				//Input.isUp(false);
				//Input.isLeft(false);
				//Input.isRight(false);
			}
			

		}