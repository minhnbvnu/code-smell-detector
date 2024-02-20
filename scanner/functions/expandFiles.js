function expandFiles( files ) {
	return grunt.util._.pluck( grunt.file.expandMapping( files ), 'src' ).map(function( values ) {
		return values[ 0 ];
	});
}