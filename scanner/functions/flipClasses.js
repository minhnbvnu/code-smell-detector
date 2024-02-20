function flipClasses( els, flCorners  ) {
		els.removeClass( "ui-btn-corner-all ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-controlgroup-last ui-shadow" )
			.eq( 0 ).addClass( flCorners[ 0 ] )
			.end()
			.last().addClass( flCorners[ 1 ] ).addClass( "ui-controlgroup-last" );
	}