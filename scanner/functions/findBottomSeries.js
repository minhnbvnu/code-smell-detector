function findBottomSeries( s, allseries ) {

			var i;

			for ( i = 0; i < allseries.length; ++i ) {
				if ( allseries[ i ].id === s.fillBetween ) {
					return allseries[ i ];
				}
			}

			if ( typeof s.fillBetween === "number" ) {
				if ( s.fillBetween < 0 || s.fillBetween >= allseries.length ) {
					return null;
				}
				return allseries[ s.fillBetween ];
			}

			return null;
		}