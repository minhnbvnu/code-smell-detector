function LightProbe( sh, intensity ) {

		Light.call( this, undefined, intensity );

		this.sh = ( sh !== undefined ) ? sh : new SphericalHarmonics3();

	}