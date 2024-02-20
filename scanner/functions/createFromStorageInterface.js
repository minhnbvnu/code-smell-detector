function createFromStorageInterface( storageType, storage ) {
	store.addType( storageType, function( key, value, options ) {
		var storedValue, parsed, i, remove,
			ret = value,
			now = (new Date()).getTime();

		if ( !key ) {
			ret = {};
			remove = [];
			i = 0;
			try {
				// accessing the length property works around a localStorage bug
				// in Firefox 4.0 where the keys don't update cross-page
				// we assign to key just to avoid Closure Compiler from removing
				// the access as "useless code"
				// https://bugzilla.mozilla.org/show_bug.cgi?id=662511
				key = storage.length;

				while ( key = storage.key( i++ ) ) {
					if ( rprefix.test( key ) ) {
						parsed = JSON.parse( storage.getItem( key ) );
						if ( parsed.expires && parsed.expires <= now ) {
							remove.push( key );
						} else {
							ret[ key.replace( rprefix, "" ) ] = parsed.data;
						}
					}
				}
				while ( key = remove.pop() ) {
					storage.removeItem( key );
				}
			} catch ( error ) {}
			return ret;
		}

		// protect against name collisions with direct storage
		key = "__amplify__" + key;

		if ( value === undefined ) {
			storedValue = storage.getItem( key );
			parsed = storedValue ? JSON.parse( storedValue ) : { expires: -1 };
			if ( parsed.expires && parsed.expires <= now ) {
				storage.removeItem( key );
			} else {
				return parsed.data;
			}
		} else {
			if ( value === null ) {
				storage.removeItem( key );
			} else {
				parsed = JSON.stringify({
					data: value,
					expires: options.expires ? now + options.expires : null
				});
				try {
					storage.setItem( key, parsed );
				// quota exceeded
				} catch( error ) {
					// expire old data and try again
					store[ storageType ]();
					try {
						storage.setItem( key, parsed );
					} catch( error ) {
						throw store.error();
					}
				}
			}
		}

		return ret;
	});
}