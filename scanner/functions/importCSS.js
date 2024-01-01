function importCSS ( url ) {

        var element = document.createElement( 'link' );
        element.href = url;
        element.rel = 'stylesheet';
        element.type = 'text/css';
        document.getElementsByTagName( 'head' )[ 0 ].appendChild( element );

    }