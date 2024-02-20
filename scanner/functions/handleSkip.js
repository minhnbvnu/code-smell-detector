function handleSkip( evt ) {
			var e = evt || w.event,
				target = e.target || e.srcElement,
				scroller = oEl.querySelector( ".sidescroll" ),
				rwd = (e.type !== "keydown" && target.className.indexOf( "sidescroll-rwd" ) > -1),
				ieID = "overthrow" + (new Date().getTime());

			if( target && target.nodeName !== "A" ){
				return;
			}

			w.overthrow.toss( scroller, {
				left: rwd ? 0 : ( scroller.querySelector( "ul" ).offsetWidth - oEl.offsetWidth )
			});
		}