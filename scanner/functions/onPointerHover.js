function onPointerHover( event ) {

    	if ( ! this.enabled ) return;

    	switch ( event.pointerType ) {

    		case 'mouse':
    		case 'pen':
    			this.pointerHover( this._getPointer( event ) );
    			break;

    	}

    }