function determineSlideLength( activeSlides, opts ){
					var slideLength = 1;
					if( opts && opts.slideLength ){
						if( opts.slideLength === "all" ){
							slideLength = activeSlides.length;
						} else {
							slideLength = parseInt( opts.slideLength, 10 );
						}
					}

					if( isNaN( slideLength ) ){
						slideLength = 1;
					}
					return slideLength;
				}