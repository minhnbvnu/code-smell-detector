function WebGLInfo( gl ) {

    	const memory = {
    		geometries: 0,
    		textures: 0
    	};

    	const render = {
    		frame: 0,
    		calls: 0,
    		triangles: 0,
    		points: 0,
    		lines: 0
    	};

    	function update( count, mode, instanceCount ) {

    		render.calls ++;

    		switch ( mode ) {

    			case 4:
    				render.triangles += instanceCount * ( count / 3 );
    				break;

    			case 1:
    				render.lines += instanceCount * ( count / 2 );
    				break;

    			case 3:
    				render.lines += instanceCount * ( count - 1 );
    				break;

    			case 2:
    				render.lines += instanceCount * count;
    				break;

    			case 0:
    				render.points += instanceCount * count;
    				break;

    			default:
    				console.error( 'THREE.WebGLInfo: Unknown draw mode:', mode );
    				break;

    		}

    	}

    	function reset() {

    		render.frame ++;
    		render.calls = 0;
    		render.triangles = 0;
    		render.points = 0;
    		render.lines = 0;

    	}

    	return {
    		memory: memory,
    		render: render,
    		programs: null,
    		autoReset: true,
    		reset: reset,
    		update: update
    	};

    }