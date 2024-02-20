function stageThree ( numberProcessed ) {
    // Google Analytics event - heatmap render
    ga('send', 'event', 'Heatmap', 'render', undefined, numberProcessed);

		var $done = $( '#done' );

		// Change tabs :D
		$( 'body' ).removeClass( 'working' );
		$( '#working' ).addClass( 'hidden' );
		$done.removeClass( 'hidden' );

		// Update count
		$( '#numberProcessed' ).text( numberProcessed.toLocaleString() );

    $( '#launch' ).click( function () {
      var $email = $( '#email' );
      if ( $email.is( ':valid' ) ) {
        $( this ).text( 'Launching... ' );
        $.post( '/heatmap/submit-email.php', {
          email: $email.val()
        } )
        .always( function () {
          $( 'body' ).addClass( 'map-active' );
          $done.fadeOut();
          activateControls();
        } );
      } else {
        alert( 'Please enter a valid email address to proceed.' );
      }
    } );

		function activateControls () {
			var $tileLayer = $( '.leaflet-tile-pane' ),
				$heatmapLayer = $( '.leaflet-heatmap-layer' ),
				originalHeatOptions = $.extend( {}, heatOptions ); // for reset

			// Update values of the dom elements
			function updateInputs () {
				var option;
				for ( option in heatOptions ) {
					if ( heatOptions.hasOwnProperty( option ) ) {
						document.getElementById( option ).value = heatOptions[option];
					}
				}
			}

			updateInputs();

			$( '.control' ).change( function () {
				switch ( this.id ) {
					case 'tileOpacity':
						$tileLayer.css( 'opacity', this.value );
						break;
					case 'heatOpacity':
						$heatmapLayer.css( 'opacity', this.value );
						break;
					default:
						heatOptions[ this.id ] = Number( this.value );
						heat.setOptions( heatOptions );
						break;
				}
			} );

			$( '#reset' ).click( function () {
				$.extend( heatOptions, originalHeatOptions );
				updateInputs();
				heat.setOptions( heatOptions );
				// Reset opacity too
				$heatmapLayer.css( 'opacity', originalHeatOptions.heatOpacity );
				$tileLayer.css( 'opacity', originalHeatOptions.tileOpacity );
			} );
		}
	}