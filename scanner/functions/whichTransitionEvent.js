function whichTransitionEvent() {
						var el = document.createElement('div');
						var transitions = {
							'transition': 'transitionend',
							'OTransition': 'oTransitionEnd',
							'MozTransition': 'transitionend',
							'WebkitTransition': 'webkitTransitionEnd'
						};
						for (var t in transitions) {
							if (el.style[t] !== undefined) {
								return transitions[t];
							}
						}
					}