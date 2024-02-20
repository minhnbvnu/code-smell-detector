function sliderTest( min, max ) {

		const target = { x: 0 };
		const controller = gui.add( target, 'x', min, max );

		const rect = controller.$slider.getBoundingClientRect();

		controller.$slider.$callEventListener( 'mousedown', {
			clientX: Math.floor( rect.left )
		} );

		assert.strictEqual( target.x, 0 );

		for ( let clientX = Math.floor( rect.left ); clientX < Math.ceil( rect.right ); clientX++ ) {

			window.$callEventListener( 'mousemove', { clientX } );

			const message = `value never has more precision than step [${min},${max}] ${controller._step} ${target.x}`;
			assert( decimals( target.x ) <= decimals( controller._step ), message );

		}

		window.$callEventListener( 'mouseup' );

	}