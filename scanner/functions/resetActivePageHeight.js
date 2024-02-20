function resetActivePageHeight(){
		var aPage = $( "." + $.mobile.activePageClass ),
			aPagePadT = parseFloat( aPage.css( "padding-top" ) ),
			aPagePadB = parseFloat( aPage.css( "padding-bottom" ) ),
			aPageBorderT = parseFloat( aPage.css( "border-top-width" ) ),
			aPageBorderB = parseFloat( aPage.css( "border-bottom-width" ) );

		aPage.css( "min-height", getScreenHeight() - aPagePadT - aPagePadB - aPageBorderT - aPageBorderB );
	}