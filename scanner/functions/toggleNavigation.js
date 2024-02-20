function toggleNavigation( target, active, useActiveSlide ) {
		if( rewind ) {
			return;
		}

		var disablePrev = false, disableNext = false,
				slides, slidesWidth, currScroll, scrollWidth, activeSlide,
				nextAnchor, prevAnchor, thisScroll, rwdAnchor, ffAnchor;


		nextAnchor = target.querySelector( "a.sidescroll-next" );
		prevAnchor = target.querySelector( "a.sidescroll-prev" );
		rwdAnchor = target.querySelector( "a.sidescroll-rwd" );
		ffAnchor = target.querySelector( "a.sidescroll-ff" );
		activeSlide = target.querySelector( "li.active" );
		thisScroll = target.querySelector( ".overthrow" );

		if( active ) {
			slides = thisScroll.querySelectorAll( "li" );

			disablePrev = (active[0] == 0);
			disableNext = (active[active.length - 1] >= slides.length - 1);
		} else {
			slidesWidth = thisScroll.offsetWidth,
			currScroll = thisScroll.scrollLeft,
			scrollWidth = thisScroll.scrollWidth - slidesWidth;

			if( useActiveSlide && activeSlide ) {
				disablePrev = !activeSlide.previousElementSibling;
			} else {
				disablePrev = currScroll < 5;
			}
			disableNext = currScroll > scrollWidth - 5;
		}

		removeClass( nextAnchor, disabledClassStr );
		removeClass( prevAnchor, disabledClassStr );

		if( ffAnchor ) {
			removeClass( ffAnchor, disabledClassStr );
		}

		if( rwdAnchor ) {
			removeClass( rwdAnchor, disabledClassStr );
		}

		if( disablePrev ) {
			addClass( prevAnchor, disabledClassStr );

			if( rwdAnchor ) {
				addClass( rwdAnchor, disabledClassStr );
			}
		}

		if( disableNext ) {
			addClass( nextAnchor, disabledClassStr );

			if( ffAnchor ) {
				addClass( ffAnchor, disabledClassStr );
			}
		}
	}