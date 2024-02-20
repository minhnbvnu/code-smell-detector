function useMultisampledRTT( renderTarget ) {

		const renderTargetProperties = properties.get( renderTarget );

		return isWebGL2 && renderTarget.samples > 0 && extensions.has( 'WEBGL_multisampled_render_to_texture' ) === true && renderTargetProperties.__useRenderToTexture !== false;

	}