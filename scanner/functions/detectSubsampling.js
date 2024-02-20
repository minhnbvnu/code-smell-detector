function detectSubsampling( img ) {
                    var iw = img.naturalWidth,
                        ih = img.naturalHeight,
                        canvas, ctx;
    
                    // subsampling may happen overmegapixel image
                    if ( iw * ih > 1024 * 1024 ) {
                        canvas = document.createElement('canvas');
                        canvas.width = canvas.height = 1;
                        ctx = canvas.getContext('2d');
                        ctx.drawImage( img, -iw + 1, 0 );
    
                        // subsampled image becomes half smaller in rendering size.
                        // check alpha channel value to confirm image is covering
                        // edge pixel or not. if alpha value is 0
                        // image is not covering, hence subsampled.
                        return ctx.getImageData( 0, 0, 1, 1 ).data[ 3 ] === 0;
                    } else {
                        return false;
                    }
                }