function CinquefoilKnot( scale ) {

		THREE.Curve.call( this );

		this.scale = ( scale === undefined ) ? 10 : scale;

	}