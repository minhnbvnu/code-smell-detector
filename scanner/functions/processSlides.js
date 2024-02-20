function processSlides() {

		var sections = document.querySelectorAll( '[data-markdown]'),
			section;

		for( var i = 0, len = sections.length; i < len; i++ ) {

			section = sections[i];

			if( section.getAttribute( 'data-markdown' ).length ) {

				var xhr = new XMLHttpRequest(),
					url = section.getAttribute( 'data-markdown' );

				datacharset = section.getAttribute( 'data-charset' );

				// see https://developer.mozilla.org/en-US/docs/Web/API/element.getAttribute#Notes
				if( datacharset != null && datacharset != '' ) {
					xhr.overrideMimeType( 'text/html; charset=' + datacharset );
				}

				xhr.onreadystatechange = function() {
					if( xhr.readyState === 4 ) {
						// file protocol yields status code 0 (useful for local debug, mobile applications etc.)
						if ( ( xhr.status >= 200 && xhr.status < 300 ) || xhr.status === 0 ) {

							section.outerHTML = slidify( xhr.responseText, {
								separator: section.getAttribute( 'data-separator' ),
								verticalSeparator: section.getAttribute( 'data-separator-vertical' ),
								notesSeparator: section.getAttribute( 'data-separator-notes' ),
								attributes: getForwardedAttributes( section )
							});

						}
						else {

							section.outerHTML = '<section data-state="alert">' +
								'ERROR: The attempt to fetch ' + url + ' failed with HTTP status ' + xhr.status + '.' +
								'Check your browser\'s JavaScript console for more details.' +
								'<p>Remember that you need to serve the presentation HTML from a HTTP server.</p>' +
								'</section>';

						}
					}
				};

				xhr.open( 'GET', url, false );

				try {
					xhr.send();
				}
				catch ( e ) {
					alert( 'Failed to get the Markdown file ' + url + '. Make sure that the presentation and the file are served by a HTTP server and the file can be found there. ' + e );
				}

			}
			else if( section.getAttribute( 'data-separator' ) || section.getAttribute( 'data-separator-vertical' ) || section.getAttribute( 'data-separator-notes' ) ) {

				section.outerHTML = slidify( getMarkdownFromSlide( section ), {
					separator: section.getAttribute( 'data-separator' ),
					verticalSeparator: section.getAttribute( 'data-separator-vertical' ),
					notesSeparator: section.getAttribute( 'data-separator-notes' ),
					attributes: getForwardedAttributes( section )
				});

			}
			else {
				section.innerHTML = createMarkdownSlide( getMarkdownFromSlide( section ) );
			}
		}

	}