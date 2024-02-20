function snakeCaseToCamelCase(variableName) {
    return variableName.split('').reduce((prev, next) => {
        if(prev.charAt(prev.length-1) === '_') {
            return prev.substr(0, prev.length-1) + next.toLocaleUpperCase();
        }
        return prev + next.toLocaleLowerCase();
	}, '');
}