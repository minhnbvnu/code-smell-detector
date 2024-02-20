function unrollLoops( string ) {

    	return string
    		.replace( unrollLoopPattern, loopReplacer )
    		.replace( deprecatedUnrollLoopPattern, deprecatedLoopReplacer );

    }