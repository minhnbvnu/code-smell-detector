function resizeThrottle() {
            clearTimeout( timeout );
            timeout = setTimeout( onResize, 20 );
        }