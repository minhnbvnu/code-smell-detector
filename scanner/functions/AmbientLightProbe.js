function AmbientLightProbe( color, intensity ) {

		LightProbe.call( this, undefined, intensity );

		var color1 = new Color().set( color );

		// without extra factor of PI in the shader, would be 2 / Math.sqrt( Math.PI );
		this.sh.coefficients[ 0 ].set( color1.r, color1.g, color1.b ).multiplyScalar( 2 * Math.sqrt( Math.PI ) );

	}