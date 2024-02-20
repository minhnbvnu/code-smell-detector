function fixListNesting($list) {
		var actionPerformed = false;
		$list.children('ul, ol').each(function () {
			Aloha.Log.debug("performing list-nesting cleanup");
			if ( ! jQuery(this).prev('li').append(this).length ) {
				//if there is no preceding li, create a new one and append to that
				jQuery(this).parent().prepend(document.createElement('li')).append(this);
			}
			actionPerformed = true;
		});
		$list.children('dl').each(function () {
			Aloha.Log.debug("performing list-nesting cleanup");
			if ( ! jQuery(this).prev('dt').append(this).length ) {
				//if there is no preceding dt, create a new one and append to that
				jQuery(this).parent().prepend(document.createElement('dt')).append(this);
			}
			actionPerformed = true;
		});
		return actionPerformed;
	}