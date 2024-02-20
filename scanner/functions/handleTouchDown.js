function handleTouchDown(event){

			event.preventDefault();
			window.focus();

			if (!isTouched){
				// first touch - init media on IOS and Android
				// note: audioContext.resume must be called on touchup, touchdown is too soon.

				if (typeof Audio !== "undefined" && Audio.playSilence){

					if (Audio.context && Audio.context.state !== "suspended"){
						Audio.playSilence();
						isTouched = true;
					}
				}
			}


			if (event.touches && event.touches.length>0){
				var touches = event.changedTouches;
				for (var i=0; i < touches.length; i++) {
					var touch = touches[i];
					initTouch(touch.identifier,touch.pageX,touch.pageY);
				}
			}else{
				var touchIndex = getTouchIndex("notouch");
				if (touchIndex>=0) touchData.touches.splice(touchIndex, 1);
				initTouch("notouch",event.pageX,event.pageY);
				//initTouch("notouch",event.clientX,event.clientY);
			}

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
		}