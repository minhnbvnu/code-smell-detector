function initTouch(id,x,y){
				touchData.isTouchDown = true;

				var rect = canvas.getBoundingClientRect();
				x -= (rect.left + window.pageXOffset);
				y -= (rect.top + window.pageYOffset);

				currentEventTarget = UI.getModalElement();
				if (currentEventTarget){
					currentEventTarget.eventX = x;
					currentEventTarget.eventY = y;
				}else{
					currentEventTarget = UI.getEventElement(x,y);
				}
				
				if (currentEventTarget && focusElement && focusElement.deActivate && focusElement.name !== currentEventTarget.name){
					focusElement.deActivate(currentEventTarget);
				}
				
				var touchX = currentEventTarget? currentEventTarget.eventX : x ;
				var touchY = currentEventTarget? currentEventTarget.eventY : y ;

				var thisTouch = {
					id: id,
					x: touchX,
					y: touchY,
					startX: touchX,
					startY: touchY,
					globalX: x,
					globalY: y,
					globalStartX: x,
					globalStartY: y,
					UIobject: currentEventTarget,
					
					isMeta: event.shiftKey || event.metaKey || event.ctrlKey || event.altKey
				};

				touchData.touches.push(thisTouch);

				if (thisTouch.UIobject){
					if (thisTouch.UIobject.onDragStart) thisTouch.UIobject.onDragStart(thisTouch);
					if (thisTouch.UIobject.onDown) thisTouch.UIobject.onDown(thisTouch);

					//console.log(thisTouch.UIobject);
				}
			}