function getBoneList( object ) {

    	const boneList = [];

    	if ( object && object.isBone ) {

    		boneList.push( object );

    	}

    	for ( let i = 0; i < object.children.length; i ++ ) {

    		boneList.push.apply( boneList, getBoneList( object.children[ i ] ) );

    	}

    	return boneList;

    }