function getTransition( rotateFn ) {
    // return C2 transition object
    return {
        preInit: function( opts ) {
            opts.slides.css( backface );
        },
        transition: function( slideOpts, currEl, nextEl, fwd, callback ) {
            var opts = slideOpts,
                curr = $(currEl), 
                next = $(nextEl),
                speed = opts.speed / 2;

            // css before transition start
            rotateFn.call(next, -90);
            next.css({
                'display': 'block',
                'visibility': 'visible',
                'background-position': '-90px',
                'opacity': 1
            });

            curr.css('background-position', '0px');

            curr.animate({ backgroundPosition: 90 }, {
                step: rotateFn,
                duration: speed,
                easing: opts.easeOut || opts.easing,
                complete: function() {
                    slideOpts.API.updateView( false, true );
                    next.animate({ backgroundPosition: 0 }, {
                        step: rotateFn,
                        duration: speed,
                        easing: opts.easeIn || opts.easing,
                        complete: callback
                    });
                }
            });
        }
    };
}