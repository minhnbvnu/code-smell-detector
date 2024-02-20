function createBanner( files ) {
	// strip folders
	var fileNames = files && files.map( stripDirectory );
	return '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
		'<%= grunt.template.today("isoDate") %>\n' +
		'<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
		(files ? ' * Includes: ' + fileNames.join(', ') + '\n' : '') +
		' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
		' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n\n\n';
}