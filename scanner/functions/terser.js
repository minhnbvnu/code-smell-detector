function terser( options ) {
	return {
		name: 'terser',
		renderChunk( code ) {
			const result = minify( code, options );
			if ( result.error ) throw result.error;
			if ( result.warnings ) {
				result.warnings.forEach( warning => {
					this.warn( warning );
				} );
			}
			return {
				code: result.code,
				map: result.map
			};

		}
	};
}