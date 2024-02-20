function initSidebarPanel(sidebar) {
		sidebar.addPanel( {
			id       : 'aloha-devtool-profiler-panel',
			title    : 'Aloha Profiler',
			expanded : true,
			activeOn : true,
			content  : '' +
				'<div id="aloha-devtool-profiler-container">' +
					'<input id="aloha-devtool-profiler-input" ' +
						'value="Aloha.Profiler.profileAlohaComponent(\'Markup.preProcessKeyStrokes\')" />' +
					'<ul id="aloha-devtool-profiler-console"></ul>' +
				'</div>',
			onInit   : function() {
				this.content.find( 'input#aloha-devtool-profiler-input' ).keydown( function( event ) {
					// Handle ENTER
					if ( event.keyCode === 13 ) {
						var input = jQuery( this );
						var value = input.val();
						if ( value ) {
							eval( value );
							PanelConsole.log( value );
							input.val( '' );
						}
					}
				} );
			}
		} );
		sidebar.show().open();
	}