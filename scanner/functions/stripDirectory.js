function stripDirectory( file ) {
	return file.replace( /.+\/(.+?)>?$/, '$1' );
}