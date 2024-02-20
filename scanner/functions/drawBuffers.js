function drawBuffers( renderTarget, framebuffer ) {

		let drawBuffers = defaultDrawbuffers;

		let needsUpdate = false;

		if ( renderTarget ) {

			drawBuffers = currentDrawbuffers.get( framebuffer );

			if ( drawBuffers === undefined ) {

				drawBuffers = [];
				currentDrawbuffers.set( framebuffer, drawBuffers );

			}

			if ( renderTarget.isWebGLMultipleRenderTargets ) {

				const textures = renderTarget.texture;

				if ( drawBuffers.length !== textures.length || drawBuffers[ 0 ] !== 36064 ) {

					for ( let i = 0, il = textures.length; i < il; i ++ ) {

						drawBuffers[ i ] = 36064 + i;

					}

					drawBuffers.length = textures.length;

					needsUpdate = true;

				}

			} else {

				if ( drawBuffers[ 0 ] !== 36064 ) {

					drawBuffers[ 0 ] = 36064;

					needsUpdate = true;

				}

			}

		} else {

			if ( drawBuffers[ 0 ] !== 1029 ) {

				drawBuffers[ 0 ] = 1029;

				needsUpdate = true;

			}

		}

		if ( needsUpdate ) {

			if ( capabilities.isWebGL2 ) {

				gl.drawBuffers( drawBuffers );

			} else {

				extensions.get( 'WEBGL_draw_buffers' ).drawBuffersWEBGL( drawBuffers );

			}

		}


	}