function updateTouch(touchIndex,x,y){
				if (touchIndex>=0){
					var thisTouch =touchData.touches[touchIndex];

					thisTouch.globalX = x-window.pageXOffset;
					thisTouch.globalY = y-window.pageYOffset;

					thisTouch.deltaX = thisTouch.globalX - thisTouch.globalStartX;
					thisTouch.deltaY = thisTouch.globalY - thisTouch.globalStartY;

					thisTouch.x = thisTouch.startX + thisTouch.deltaX;
					thisTouch.y = thisTouch.startY + thisTouch.deltaY;
					
					touchData.touches.splice(touchIndex, 1, thisTouch);

					if (touchData.isTouchDown && thisTouch.UIobject){
						if (thisTouch.UIobject.onDrag){
							thisTouch.dragX = x;
							thisTouch.dragY = y;
							thisTouch.UIobject.onDrag(thisTouch);
						}
					}
				}
			}