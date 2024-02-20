function Tester( obj ) {

		this.originalDeep = deepClone( obj );
		const originalShallow = Object.assign( {}, obj );

		// assert matches original state
		// assert object types retain reference
		this.compare = state => {
			for ( let key in obj ) {
				const val = obj[ key ];
				const deep = state[ key ];
				const shallow = originalShallow[ key ];
				if ( Object( val ) === val ) {
					assert.deepStrictEqual( val, deep, 'deep ' + key );
					assert.strictEqual( val, shallow, 'shallow ' + key );
				} else {
					assert.strictEqual( val, deep );
				}
			}
		};

	}