function fileToImportName(fPath) {
	return (fPath.charAt(0).toUpperCase() + fPath.slice(1)).replace(
		/(-[a-z])/g,
		($1) => $1.toUpperCase().replace('-', '')
	);
}