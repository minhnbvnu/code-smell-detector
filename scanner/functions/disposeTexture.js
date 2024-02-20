function disposeTexture() {

					texture.dispose();

					morphTextures.delete( geometry );

					geometry.removeEventListener( 'dispose', disposeTexture );

				}