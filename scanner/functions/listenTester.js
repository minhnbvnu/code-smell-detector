function listenTester( name, cycle, ...addArgs ) {

		const obj = {};
		obj[ name ] = cycle[ cycle.length - 1 ];
		gui.add( obj, name, ...addArgs ).listen();
		let index = 0;

		const loop = () => {

			if ( params.animate ) obj[ name ] = cycle[ index ];
			if ( ++index > cycle.length - 1 ) {
				index = 0;
			}

			setTimeout( loop, 1000 );

		};

		loop();

	}