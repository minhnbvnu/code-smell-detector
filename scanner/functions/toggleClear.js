function toggleClear() {
				setTimeout(function() {
					clearbtn.toggleClass( "ui-input-clear-hidden", !input.val() );
				}, 0);
			}