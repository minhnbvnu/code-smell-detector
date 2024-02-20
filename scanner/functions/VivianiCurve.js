function VivianiCurve( scale ) {

		THREE.Curve.call( this );

		this.scale = ( scale === undefined ) ? 70 : scale;

	}