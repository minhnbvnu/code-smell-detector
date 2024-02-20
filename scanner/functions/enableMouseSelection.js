function enableMouseSelection ( dt )
{
	var body = $( dt.table().body() );
	var ctx = dt.settings()[0];
	var selector = ctx._select.selector;

	body
		.on( 'mousedown.dtSelect', selector, function(e) {
			// Disallow text selection for shift clicking on the table so multi
			// element selection doesn't look terrible!
			if ( e.shiftKey ) {
				body
					.css( '-moz-user-select', 'none' )
					.one('selectstart.dtSelect', selector, function () {
						return false;
					} );
			}
		} )
		.on( 'mouseup.dtSelect', selector, function(e) {
			// Allow text selection to occur again, Mozilla style (tested in FF
			// 35.0.1 - still required)
			body.css( '-moz-user-select', '' );
		} )
		.on( 'click.dtSelect', selector, function ( e ) {
			var items = dt.select.items();
			var idx;

			// If text was selected (click and drag), then we shouldn't change
			// the row's selected state
			if ( window.getSelection && window.getSelection().toString() ) {
				return;
			}

			var ctx = dt.settings()[0];

			// Ignore clicks inside a sub-table
			if ( $(e.target).closest('div.dataTables_wrapper')[0] != dt.table().container() ) {
				return;
			}

			var cell = $(e.target).closest('td, th');
			var cellIndex = dt.cell( cell ).index();

			// Check the cell actually belongs to the host DataTable (so child rows,
			// etc, are ignored)
			if ( ! dt.cell( cell ).any() ) {
				return;
			}

			if ( items === 'row' ) {
				idx = cellIndex.row;
				typeSelect( e, dt, ctx, 'row', idx );
			}
			else if ( items === 'column' ) {
				idx = dt.cell( cell ).index().column;
				typeSelect( e, dt, ctx, 'column', idx );
			}
			else if ( items === 'cell' ) {
				idx = dt.cell( cell ).index();
				typeSelect( e, dt, ctx, 'cell', idx );
			}

			ctx._select_lastCell = cellIndex;
		} );

	// Blurable
	$('body').on( 'click.dtSelect', function ( e ) {
		if ( ctx._select.blurable ) {
			// If the click was inside the DataTables container, don't blur
			if ( $(e.target).parents().filter( dt.table().container() ).length ) {
				return;
			}

			// Don't blur in Editor form
			if ( $(e.target).parents('div.DTE').length ) {
				return;
			}

			clear( ctx, true );
		}
	} );
}