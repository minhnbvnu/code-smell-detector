function spyDestroyRecursive( child ) {
		childCount++;
		spy( child, 'destroy', () => destroyCount++ );
		if ( child.children ) {
			child.children.forEach( spyDestroyRecursive );
		}
	}