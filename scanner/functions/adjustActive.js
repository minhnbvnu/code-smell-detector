function adjustActive() {
        /*jshint validthis: true */
        adjustSlide.apply( opts.container.find( '.' + opts.slideActiveClass ) );
        clearTimeout( timeout2 );
        timeout2 = setTimeout( adjustAll, 50 );
    }