function hourFormatParse( tokenRe, numberParser ) {
			var aux, isPositive,
				match = value.match( tokenRe );
			numberParser = numberParser || function( value ) {
				return +value;
			};

			if ( !match ) {
				return false;
			}

			isPositive = match[ 1 ];

			// hourFormat containing H only, e.g., `+H;-H`
			if ( match.length < 6 ) {
				aux = isPositive ? 1 : 3;
				token.value = numberParser( match[ aux ] ) * 60;

			// hourFormat containing H and m, e.g., `+HHmm;-HHmm`
			} else if ( match.length < 10 ) {
				aux = isPositive ? [ 1, 3 ] : [ 5, 7 ];
				token.value = numberParser( match[ aux[ 0 ] ] ) * 60 +
					numberParser( match[ aux[ 1 ] ] );

			// hourFormat containing H, m, and s e.g., `+HHmmss;-HHmmss`
			} else {
				aux = isPositive ? [ 1, 3, 5 ] : [ 7, 9, 11 ];
				token.value = numberParser( match[ aux[ 0 ] ] ) * 60 +
					numberParser( match[ aux[ 1 ] ] ) +
					numberParser( match[ aux[ 2 ] ] ) / 60;
			}

			if ( isPositive ) {
				token.value *= -1;
			}

			return true;
		}