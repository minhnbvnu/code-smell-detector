function deleteRequireCache( id ) {
	/*
	 * recursively delete, but skip mature code loaded from node_modules
	 */
	if(id.indexOf('node_modules') >= 0) return;
	console.log('deleting cache of: ' + id);
	var files = require.cache[ id ];
	if (typeof files !== 'undefined') {
		for (var i in files.children) {
			deleteRequireCache( files.children[i].id );
		}
		delete require.cache[ id ];
	}
}