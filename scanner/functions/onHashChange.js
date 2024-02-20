function onHashChange( opts, setStartingSlide ) {
    var hash;
    if ( opts._hashFence ) {
        opts._hashFence = false;
        return;
    }
    
    hash = window.location.hash.substring(1);

    opts.slides.each(function(i) {
        if ( $(this).data( 'cycle-hash' ) == hash ) {
            if ( setStartingSlide === true ) {
                opts.startingSlide = i;
            }
            else {
                var fwd = opts.currSlide < i;
                opts.nextSlide = i;
                opts.API.prepareTx( true, fwd );
            }
            return false;
        }
    });
}