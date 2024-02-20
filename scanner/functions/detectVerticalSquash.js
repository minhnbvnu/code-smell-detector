function detectVerticalSquash( img, iw, ih ) {
                    var canvas = document.createElement('canvas'),
                        ctx = canvas.getContext('2d'),
                        sy = 0,
                        ey = ih,
                        py = ih,
                        data, alpha, ratio;
    
    
                    canvas.width = 1;
                    canvas.height = ih;
                    ctx.drawImage( img, 0, 0 );
                    data = ctx.getImageData( 0, 0, 1, ih ).data;
    
                    // search image edge pixel position in case
                    // it is squashed vertically.
                    while ( py > sy ) {
                        alpha = data[ (py - 1) * 4 + 3 ];
    
                        if ( alpha === 0 ) {
                            ey = py;
                        } else {
                            sy = py;
                        }
    
                        py = (ey + sy) >> 1;
                    }
    
                    ratio = (py / ih);
                    return (ratio === 0) ? 1 : ratio;
                }