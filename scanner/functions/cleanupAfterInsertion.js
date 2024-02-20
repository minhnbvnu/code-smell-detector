function cleanupAfterInsertion () {
		var dirty = jQuery( '.aloha-table-cleanme' ).removeClass(
						'aloha-table-cleanme' );

		for ( var i = 0; i < dirty.length; i++ ) {
			if ( jQuery.trim( jQuery( dirty[ i ] ).html() ) == '' &&
					!GENTICS.Utils.Dom.isEditingHost( dirty[ i ] ) ) {
				jQuery( dirty[ i ] ).remove();

				/*
				// For debugging: to see what we are deleting
				jQuery( dirty[ i ] ).css({
					border: '3px solid red',
					display: 'block'
				});
				*/
			}
		}
	}