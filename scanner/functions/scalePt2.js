function scalePt2( pt, vec, size ) {

    				if ( ! vec ) console.error( 'THREE.ExtrudeGeometry: vec does not exist' );

    				return vec.clone().multiplyScalar( size ).add( pt );

    			}