function onPointerDown( event ) {

    	if ( ! this.enabled ) return;

    	this.domElement.setPointerCapture( event.pointerId );

    	this.domElement.addEventListener( 'pointermove', this._onPointerMove );

    	this.pointerHover( this._getPointer( event ) );
    	this.pointerDown( this._getPointer( event ) );

    }