function onSessionEvent( event ) {

    			const controller = inputSourcesMap.get( event.inputSource );

    			if ( controller ) {

    				controller.dispatchEvent( { type: event.type, data: event.inputSource } );

    			}

    		}