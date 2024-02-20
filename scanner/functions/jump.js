function jump( e, button ){
				if( !isNaN(button) ){//initial or special call from the outside $(container).trigger('goto',[index]);
					e.data = button;
					button = pane;
				}

				var
					pos = e.data, n,
					real = e.type, //is a real event triggering ?
					$items = settings.exclude ? getItems().slice(0,-settings.exclude) : getItems(),//handle a possible exclude
					limit = $items.length,
					elem = $items[pos],
					duration = settings.duration;

				if( real )//real event object
					e.preventDefault();

				if( auto ){
					clear();//clear any possible automatic scrolling.
					timer = setTimeout( next, settings.interval ); 
				}

				if( !elem ){ //exceeded the limits
					n = pos < 0 ? 0 : limit - 1;
					if( active != n )//we exceeded for the first time
						pos = n;
					else if( !settings.cycle )//this is a bad case
						return;
					else
						pos = limit - n - 1;//invert, go to the other side
					elem = $items[pos];
				}

				if( !elem || real && active == pos || //could happen, save some CPU cycles in vain
					settings.lock && $pane.is(':animated') || //no animations while busy
					real && settings.onBefore && //callback returns false ?
					settings.onBefore.call(button, e, elem, $pane, getItems(), pos) === false ) return;

				if( settings.stop )
					$pane.queue('fx',[]).stop();//remove all its animations

				if( settings.constant )
					duration = Math.abs(duration/step * (active - pos ));//keep constant velocity

				$pane
					.scrollTo( elem, duration, settings )//do scroll
					.trigger('notify.serialScroll',[pos]);//in case serialScroll was called on this elem more than once.
			}