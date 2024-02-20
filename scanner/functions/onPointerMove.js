function onPointerMove( event ) {

    	if ( ! this.enabled ) return;

    	this.pointerMove( this._getPointer( event ) );

    }