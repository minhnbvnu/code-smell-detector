function paramsToSignature( params ) {

	if ( params.length === 0 ) {
		return '()';
	}

	const paramList = params
		.map( singleParamToSignature )
		.join( ', ' );

	return `( ${paramList} )`;

}