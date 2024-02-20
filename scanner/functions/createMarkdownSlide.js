function createMarkdownSlide( content, options ) {

		options = getSlidifyOptions( options );

		var notesMatch = content.split( new RegExp( options.notesSeparator, 'mgi' ) );

		if( notesMatch.length === 2 ) {
			content = notesMatch[0] + '<aside class="notes">' + marked(notesMatch[1].trim()) + '</aside>';
		}

		// prevent script end tags in the content from interfering
		// with parsing
		content = content.replace( /<\/script>/g, SCRIPT_END_PLACEHOLDER );

		return '<script type="text/template">' + content + '</script>';

	}