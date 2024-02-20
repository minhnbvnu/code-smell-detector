function onMSPointerDown(e) {
	          e.stopPropagation();
	          if (slider.animating) {
	            e.preventDefault();
	          } else {
	            slider.pause();
	            el._gesture.addPointer(e.pointerId);
	            accDx = 0;
	            cwidth = (vertical) ? slider.h : slider.w;
	            startT = Number(new Date());
	            // CAROUSEL:

	            offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
	              (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
	                (carousel && slider.currentSlide === slider.last) ? slider.limit :
	                  (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
	                    (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
	          }
	        }