function refreshUniformsParticle ( uniforms, material ) {

		uniforms.psColor.value = material.color;
		uniforms.opacity.value = material.opacity;
		uniforms.size.value = material.size;
		uniforms.scale.value = _canvas.height / 2.0; // TODO: Cache this.

		uniforms.map.value = material.map;

		if ( material.map !== null ) {

			var offset = material.map.offset;
			var repeat = material.map.repeat;

			uniforms.offsetRepeat.value.set( offset.x, offset.y, repeat.x, repeat.y );

		}

	}