function PositionalAudioHelper( audio, range, divisionsInnerAngle, divisionsOuterAngle ) {

		this.audio = audio;
		this.range = range || 1;
		this.divisionsInnerAngle = divisionsInnerAngle || 16;
		this.divisionsOuterAngle = divisionsOuterAngle || 2;

		var geometry = new BufferGeometry();
		var divisions = this.divisionsInnerAngle + this.divisionsOuterAngle * 2;
		var positions = new Float32Array( ( divisions * 3 + 3 ) * 3 );
		geometry.addAttribute( 'position', new BufferAttribute( positions, 3 ) );

		var materialInnerAngle = new LineBasicMaterial( { color: 0x00ff00 } );
		var materialOuterAngle = new LineBasicMaterial( { color: 0xffff00 } );

		Line.call( this, geometry, [ materialOuterAngle, materialInnerAngle ] );

		this.update();

	}