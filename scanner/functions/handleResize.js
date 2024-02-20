function handleResize( e ){
					clearTimeout(debounce);
					debounce = setTimeout(function(){
						sendEvent( thisSideScroll, evtPrefix + "-resize", {}, thisSideScroll.ieID );
						handleSnap( e );
					}, 100);
				}