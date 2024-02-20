function applyCurrent( current ) {
			return function() {
				var assert = new Assert( QUnit.config.current );
				current.apply( assert, arguments );
			};
		}