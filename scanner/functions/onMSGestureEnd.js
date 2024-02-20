function onMSGestureEnd(e) {
	          e.stopPropagation();
	          var slider = e.target._slider;
	          if (!slider) {
	            return;
	          }
	          if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
	            var updateDx = (reverse) ? -dx : dx,
	              target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

	            if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth / 2)) {
	              slider.flexAnimate(target, slider.vars.pauseOnAction);
	            } else {
	              if (!fade) {slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true);}
	            }
	          }

	          startX = null;
	          startY = null;
	          dx = null;
	          offset = null;
	          accDx = 0;
	        }