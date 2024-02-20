function nearest_pow2( n ) {

			var l = Math.log( n ) / Math.LN2;
			return Math.pow( 2, Math.round(  l ) );

		}