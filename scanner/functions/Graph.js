function Graph ( _dom, _id, _defArg ) {

        var _def = _defArg || {};
        var _canvas = document.createElement( 'canvas' ),
            _ctx = _canvas.getContext( '2d' ),
            _max = 0,
            _current = 0;

        var c = _def.color ? _def.color : '#666666';

        var _dotCanvas = document.createElement( 'canvas' ),
            _dotCtx = _dotCanvas.getContext( '2d' );
        _dotCanvas.width = 1;
        _dotCanvas.height = 2 * _elHeight;
        _dotCtx.fillStyle = '#444444';
        _dotCtx.fillRect( 0, 0, 1, 2 * _elHeight );
        _dotCtx.fillStyle = c;
        _dotCtx.fillRect( 0, _elHeight, 1, _elHeight );
        _dotCtx.fillStyle = '#ffffff';
        _dotCtx.globalAlpha = 0.5;
        _dotCtx.fillRect( 0, _elHeight, 1, 1 );
        _dotCtx.globalAlpha = 1;

        var _alarmCanvas = document.createElement( 'canvas' ),
            _alarmCtx = _alarmCanvas.getContext( '2d' );
        _alarmCanvas.width = 1;
        _alarmCanvas.height = 2 * _elHeight;
        _alarmCtx.fillStyle = '#444444';
        _alarmCtx.fillRect( 0, 0, 1, 2 * _elHeight );
        _alarmCtx.fillStyle = '#b70000';
        _alarmCtx.fillRect( 0, _elHeight, 1, _elHeight );
        _alarmCtx.globalAlpha = 0.5;
        _alarmCtx.fillStyle = '#ffffff';
        _alarmCtx.fillRect( 0, _elHeight, 1, 1 );
        _alarmCtx.globalAlpha = 1;

        function _init () {

            _canvas.width = _elWidth;
            _canvas.height = _elHeight;
            _canvas.style.width = _canvas.width + 'px';
            _canvas.style.height = _canvas.height + 'px';
            _canvas.className = 'rs-canvas';
            _dom.appendChild( _canvas );

            _ctx.fillStyle = '#444444';
            _ctx.fillRect( 0, 0, _canvas.width, _canvas.height );

        }

        function _draw ( v, alarm ) {
            _current += ( v - _current ) * 0.1;
            _max *= 0.99;
            if ( _current > _max ) _max = _current;
            _ctx.drawImage( _canvas, 1, 0, _canvas.width - 1, _canvas.height, 0, 0, _canvas.width - 1, _canvas.height );
            if ( alarm ) {
                _ctx.drawImage( _alarmCanvas, _canvas.width - 1, _canvas.height - _current * _canvas.height / _max - _elHeight );
            } else {
                _ctx.drawImage( _dotCanvas, _canvas.width - 1, _canvas.height - _current * _canvas.height / _max - _elHeight );
            }
        }

        _init();

        return {
            draw: _draw
        };

    }