function onPointerUp( event ) {

    	if ( ! this.enabled ) return;

    	this.domElement.releasePointerCapture( event.pointerId );

    	this.domElement.removeEventListener( 'pointermove', this._onPointerMove );

    	this.pointerUp( this._getPointer( event ) );

    }