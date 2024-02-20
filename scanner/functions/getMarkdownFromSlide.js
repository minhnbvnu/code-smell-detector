function getMarkdownFromSlide( section ) {

		// look for a <script> or <textarea data-template> wrapper
		var template = section.querySelector( '[data-template]' ) || section.querySelector( 'script' );

		// strip leading whitespace so it isn't evaluated as code
		var text = ( template || section ).textContent;

		// restore script end tags
		text = text.replace( new RegExp( SCRIPT_END_PLACEHOLDER, 'g' ), '</script>' );

		var leadingWs = text.match( /^\n?(\s*)/ )[1].length,
			leadingTabs = text.match( /^\n?(\t*)/ )[1].length;

		if( leadingTabs > 0 ) {
			text = text.replace( new RegExp('\\n?\\t{' + leadingTabs + '}','g'), '\n' );
		}
		else if( leadingWs > 1 ) {
			text = text.replace( new RegExp('\\n? {' + leadingWs + '}', 'g'), '\n' );
		}

		return text;

	}