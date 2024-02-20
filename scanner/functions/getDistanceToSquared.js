function getDistanceToSquared( object1, object2 ) {

    			_a.setFromMatrixPosition( object1.matrixWorld );
    			_b.setFromMatrixPosition( object2.matrixWorld );

    			return _a.distanceToSquared( _b );

    		}