function childSort( originalOrder ) {

	return function( a, b ) {

		const kindComparison = customComparison( KIND_SORT, a.kind, b.kind );
		if ( kindComparison !== 0 ) return kindComparison;

		if ( a.kind === 'member' ) {

			const alphabetComparison = customComparison( ALPHABET_SORT, a.name[ 0 ], b.name[ 0 ] );

			if ( alphabetComparison !== 0 ) return alphabetComparison;

			return a.name.localeCompare( b.name );

		} else {

			return customComparison( originalOrder, a, b );

		}

	};

}