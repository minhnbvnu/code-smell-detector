function touchend( event ) {

		if ( _this.enabled === false ) return;

		switch ( event.touches.length ) {

		case 1:
			_rotateEnd.copy( getMouseProjectionOnBall( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY ) );
			_rotateStart.copy( _rotateEnd );
			break;

		case 2:
			_touchZoomDistanceStart = _touchZoomDistanceEnd = 0;

			var x = ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX ) / 2;
			var y = ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY ) / 2;
			_panEnd.copy( getMouseOnScreen( x, y ) );
			_panStart.copy( _panEnd );
			break;

		}

		_state = STATE.NONE;
		_this.dispatchEvent( endEvent );

	}