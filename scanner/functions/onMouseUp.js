function onMouseUp( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		handleMouseUp( event );

		document.removeEventListener( 'mousemove', onMouseMove, false );
		document.removeEventListener( 'mouseup', onMouseUp, false );
		document.removeEventListener( 'mouseout', onMouseUp, false );

		scope.dispatchEvent( endEvent );

		state = STATE.NONE;

	}