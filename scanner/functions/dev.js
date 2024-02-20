function dev( config ) {

	const commands = [];

	const longest = getLongest( Object.keys( config ) );

	for ( let name in config ) {

		const { onchange, flag, color } = config[ name ];

		let command;

		if ( onchange ) {
			const files = onchange.map( w => `'${w}'` ).join( ' ' );
			command = `./node_modules/.bin/onchange ${files} -- npm run ${name}`;
		} else {
			command = `npm run ${name}`;
		}

		if ( flag ) {
			command += ' -- ' + flag;
		}

		name = name.padStart( longest, '·' );

		commands.push( {
			command,
			name,
			prefixColor: `${color}.inverse`
		} );

	}

	concurrently( commands, { prefix: '{name}' } ).catch( error => {
		console.log( error );
	} );

}