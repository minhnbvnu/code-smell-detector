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