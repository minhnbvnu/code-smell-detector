function getRotate( dir ) {
    return function( degrees ) {
        /*jshint validthis:true */
        var el = $(this);
        el.css({
            '-webkit-transform': 'rotate'+dir+'('+degrees+'deg)',
            '-moz-transform': 'rotate'+dir+'('+degrees+'deg)', 
            '-ms-transform': 'rotate'+dir+'('+degrees+'deg)',
            '-o-transform': 'rotate'+dir+'('+degrees+'deg)',
            'transform': 'rotate'+dir+'('+degrees+'deg)'
        });
    };
}