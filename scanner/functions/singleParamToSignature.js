function singleParamToSignature( param ) {

	let name = param.name;

	const hasDefault = param.defaultvalue !== undefined;

	if ( hasDefault ) {
		name += '=' + param.defaultvalue;
	}

	if ( param.optional ) {
		name = `[${name}]`;
	}

	return name;

}