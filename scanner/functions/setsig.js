function setsig(target, n){
		var sig = Sig + n + ':', i;
		for(i = 0; i < target.nodes.length; i++){
			// could check for overlapping targets here.
			target.set( target.nodes[i], sig );
		}
	}