function inclination( vector ) {

    			return Math.atan2( - vector.y, Math.sqrt( ( vector.x * vector.x ) + ( vector.z * vector.z ) ) );

    		}