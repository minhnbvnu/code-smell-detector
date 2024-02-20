function readData() {

    								reader.read().then( ( { done, value } ) => {

    									if ( done ) {

    										controller.close();

    									} else {

    										loaded += value.byteLength;

    										const event = new ProgressEvent( 'progress', { lengthComputable, loaded, total } );
    										for ( let i = 0, il = callbacks.length; i < il; i ++ ) {

    											const callback = callbacks[ i ];
    											if ( callback.onProgress ) callback.onProgress( event );

    										}

    										controller.enqueue( value );
    										readData();

    									}

    								} );

    							}