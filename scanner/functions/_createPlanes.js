function _createPlanes() {

    	const _lodPlanes = [];
    	const _sizeLods = [];
    	const _sigmas = [];

    	let lod = LOD_MAX;

    	for ( let i = 0; i < TOTAL_LODS; i ++ ) {

    		const sizeLod = Math.pow( 2, lod );
    		_sizeLods.push( sizeLod );
    		let sigma = 1.0 / sizeLod;

    		if ( i > LOD_MAX - LOD_MIN ) {

    			sigma = EXTRA_LOD_SIGMA[ i - LOD_MAX + LOD_MIN - 1 ];

    		} else if ( i == 0 ) {

    			sigma = 0;

    		}

    		_sigmas.push( sigma );

    		const texelSize = 1.0 / ( sizeLod - 1 );
    		const min = - texelSize / 2;
    		const max = 1 + texelSize / 2;
    		const uv1 = [ min, min, max, min, max, max, min, min, max, max, min, max ];

    		const cubeFaces = 6;
    		const vertices = 6;
    		const positionSize = 3;
    		const uvSize = 2;
    		const faceIndexSize = 1;

    		const position = new Float32Array( positionSize * vertices * cubeFaces );
    		const uv = new Float32Array( uvSize * vertices * cubeFaces );
    		const faceIndex = new Float32Array( faceIndexSize * vertices * cubeFaces );

    		for ( let face = 0; face < cubeFaces; face ++ ) {

    			const x = ( face % 3 ) * 2 / 3 - 1;
    			const y = face > 2 ? 0 : - 1;
    			const coordinates = [
    				x, y, 0,
    				x + 2 / 3, y, 0,
    				x + 2 / 3, y + 1, 0,
    				x, y, 0,
    				x + 2 / 3, y + 1, 0,
    				x, y + 1, 0
    			];
    			position.set( coordinates, positionSize * vertices * face );
    			uv.set( uv1, uvSize * vertices * face );
    			const fill = [ face, face, face, face, face, face ];
    			faceIndex.set( fill, faceIndexSize * vertices * face );

    		}

    		const planes = new BufferGeometry();
    		planes.setAttribute( 'position', new BufferAttribute( position, positionSize ) );
    		planes.setAttribute( 'uv', new BufferAttribute( uv, uvSize ) );
    		planes.setAttribute( 'faceIndex', new BufferAttribute( faceIndex, faceIndexSize ) );
    		_lodPlanes.push( planes );

    		if ( lod > LOD_MIN ) {

    			lod --;

    		}

    	}

    	return { _lodPlanes, _sizeLods, _sigmas };

    }