function defineProperty( propName, defaultValue ) {

    			let propValue = defaultValue;

    			Object.defineProperty( scope, propName, {

    				get: function () {

    					return propValue !== undefined ? propValue : defaultValue;

    				},

    				set: function ( value ) {

    					if ( propValue !== value ) {

    						propValue = value;
    						_plane[ propName ] = value;
    						_gizmo[ propName ] = value;

    						scope.dispatchEvent( { type: propName + '-changed', value: value } );
    						scope.dispatchEvent( _changeEvent );

    					}

    				}

    			} );

    			scope[ propName ] = defaultValue;
    			_plane[ propName ] = defaultValue;
    			_gizmo[ propName ] = defaultValue;

    		}