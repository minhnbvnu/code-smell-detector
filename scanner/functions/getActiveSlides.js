function getActiveSlides( left ){
					var slides = thisScroll.querySelectorAll( "li" ),
						numSlides = slides.length,
						slidesWidth = thisScroll.offsetWidth,
						slideWidth = slides[ 0 ].offsetWidth,
						scrollLeft = left !== undefined ? left : thisScroll.scrollLeft,
						startSlide = Math.round( scrollLeft / slideWidth ),
						tollerance = 10,
						ret = [];

					startSlide = Math.max( 0, startSlide );
					startSlide = Math.min( numSlides, startSlide );

					ret.push(startSlide);
					for( var i = 2; i < numSlides; i++ ){
						if( i * slideWidth < slidesWidth + tollerance ) {
							ret.push( startSlide + i - 1 );
						}
					}

					slideNum = startSlide;
					return ret;
				}