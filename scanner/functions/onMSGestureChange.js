function onMSGestureChange(e) {
	          e.stopPropagation();
	          var slider = e.target._slider;
	          if (!slider) {
	            return;
	          }
	          var transX = -e.translationX,
	            transY = -e.translationY;

	          //Accumulate translations.
	          accDx = accDx + ((vertical) ? transY : transX);
	          dx = accDx;
	          scrolling = (vertical) ? (Math.abs(accDx) < Math.abs(-transX)) : (Math.abs(accDx) < Math.abs(-transY));

	          if (e.detail === e.MSGESTURE_FLAG_INERTIA) {
	            setImmediate(function() {
	              el._gesture.stop();
	            });

	            return;
	          }

	          if (!scrolling || Number(new Date()) - startT > 500) {
	            e.preventDefault();
	            if (!fade && slider.transitions) {
	              if (!slider.vars.animationLoop) {
	                dx = accDx / ((slider.currentSlide === 0 && accDx < 0 || slider.currentSlide === slider.last && accDx > 0) ? (Math.abs(accDx) / cwidth + 2) : 1);
	              }
	              slider.setProps(offset + dx, "setTouch");
	            }
	          }
	        }