function setScrollableWidth(){
					var slides = thisScroll.querySelectorAll( "li" ),
					  container = thisScroll.querySelector( "ul" );

					container.style.width = (slides[0].offsetWidth * slides.length) + "px";
				}