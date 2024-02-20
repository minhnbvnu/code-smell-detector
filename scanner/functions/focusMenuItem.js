function focusMenuItem() {
					var selector = self.list.find( "." + $.mobile.activeBtnClass + " a" );
					if ( selector.length === 0 ) {
						selector = self.list.find( "li.ui-btn:not(:jqmData(placeholder='true')) a" );
					}
					selector.first().focus().closest( "li" ).addClass( "ui-btn-down-" + widget.options.theme );
				}