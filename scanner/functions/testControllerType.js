function testControllerType( type, controller ) {
		assert( controller instanceof type );
		assert.strictEqual( controller, controller.disable() );
		assert.strictEqual( controller, controller.enable() );
		assert.strictEqual( controller, controller.listen() );
		assert.strictEqual( controller, controller.max() );
		assert.strictEqual( controller, controller.min() );
		assert.strictEqual( controller, controller.name( 'hi' ) );
		assert.strictEqual( controller, controller.onChange( function() { } ) );
		assert.strictEqual( controller, controller.onFinishChange( function() { } ) );
		assert.strictEqual( controller, controller.reset() );
		assert.strictEqual( controller, controller.setValue() );
		assert.strictEqual( controller, controller.step() );
		assert.strictEqual( controller, controller.updateDisplay() );
	}