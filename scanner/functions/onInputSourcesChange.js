function onInputSourcesChange( event ) {

    			const inputSources = session.inputSources;

    			// Assign inputSources to available controllers

    			for ( let i = 0; i < controllers.length; i ++ ) {

    				inputSourcesMap.set( inputSources[ i ], controllers[ i ] );

    			}

    			// Notify disconnected

    			for ( let i = 0; i < event.removed.length; i ++ ) {

    				const inputSource = event.removed[ i ];
    				const controller = inputSourcesMap.get( inputSource );

    				if ( controller ) {

    					controller.dispatchEvent( { type: 'disconnected', data: inputSource } );
    					inputSourcesMap.delete( inputSource );

    				}

    			}

    			// Notify connected

    			for ( let i = 0; i < event.added.length; i ++ ) {

    				const inputSource = event.added[ i ];
    				const controller = inputSourcesMap.get( inputSource );

    				if ( controller ) {

    					controller.dispatchEvent( { type: 'connected', data: inputSource } );

    				}

    			}

    		}