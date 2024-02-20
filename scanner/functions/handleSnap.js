function handleSnap( e ){
					o.intercept();
					var slideWidth = thisScroll.querySelector( "li" ).offsetWidth,
						currScroll = thisScroll.scrollLeft,
						newSlide = Math.round( currScroll / slideWidth );

					if( scrollStart !== false ){
						var distScrolled = currScroll - scrollStart;
						if( Math.abs( distScrolled ) > snapTolerance ){
							newSlide = slideNum + ( distScrolled > 0 ? 1 : -1 );
						}

					}

					var newScroll = slideWidth * newSlide;

					o.toss( thisScroll, {
						left: newScroll,
						duration: 20,
						easing: options.easing
					});

					if( slideNum !== newSlide ){
						sendEvent(
							thisSideScroll, // elem to receive event
							newSlide > slideNum ? evtNext : evtPrev, // evt name
							{
								active: getActiveSlides( newScroll ), // active slides
								originalEvent: e
							},
							ieID
						);
						slideNum = newSlide;
					}
				}