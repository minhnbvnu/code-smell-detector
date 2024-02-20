function sidewalls( contour, layeroffset ) {

    				let i = contour.length;

    				while ( -- i >= 0 ) {

    					const j = i;
    					let k = i - 1;
    					if ( k < 0 ) k = contour.length - 1;

    					//console.log('b', i,j, i-1, k,vertices.length);

    					for ( let s = 0, sl = ( steps + bevelSegments * 2 ); s < sl; s ++ ) {

    						const slen1 = vlen * s;
    						const slen2 = vlen * ( s + 1 );

    						const a = layeroffset + j + slen1,
    							b = layeroffset + k + slen1,
    							c = layeroffset + k + slen2,
    							d = layeroffset + j + slen2;

    						f4( a, b, c, d );

    					}

    				}

    			}