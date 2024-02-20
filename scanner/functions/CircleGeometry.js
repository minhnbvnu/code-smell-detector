function CircleGeometry( radius, arc ) {

    			const geometry = new TorusGeometry( radius, 0.0075, 3, 64, arc * Math.PI * 2 );
    			geometry.rotateY( Math.PI / 2 );
    			geometry.rotateX( Math.PI / 2 );
    			return geometry;

    		}