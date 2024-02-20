function BFSRequire(module) {
	    switch (module) {
	        case 'fs':
	            return _fsMock;
	        case 'path':
	            return path;
	        case 'buffer':
	            // The 'buffer' module has 'Buffer' as a property.
	            return buffer;
	        case 'process':
	            return process;
	        case 'bfs_utils':
	            return BFSUtils;
	        default:
	            return Backends[module];
	    }
	}