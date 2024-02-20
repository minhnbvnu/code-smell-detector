function correctUV( uv, stride, vector, azimuth ) {

    			if ( ( azimuth < 0 ) && ( uv.x === 1 ) ) {

    				uvBuffer[ stride ] = uv.x - 1;

    			}

    			if ( ( vector.x === 0 ) && ( vector.z === 0 ) ) {

    				uvBuffer[ stride ] = azimuth / 2 / Math.PI + 0.5;

    			}

    		}