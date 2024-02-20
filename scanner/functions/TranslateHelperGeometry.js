function TranslateHelperGeometry() {

    			const geometry = new BufferGeometry();

    			geometry.setAttribute( 'position', new Float32BufferAttribute( [ 0, 0, 0, 1, 1, 1 ], 3 ) );

    			return geometry;

    		}