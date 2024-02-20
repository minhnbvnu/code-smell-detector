function enableSelection($elem) {
			$elem.removeAttr('unselectable');
			$elem.css({
				'-webkit-user-select' : 'text',
//				'-moz-user-select'    : 'text',  // Because this feature is broken in Firefox
				'user-select'         : 'text'
			});
			$elem.onselectstart = null;
		}