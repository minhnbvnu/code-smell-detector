function deprecatedLoopReplacer( match, start, end, snippet ) {

    	console.warn( 'WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead.' );
    	return loopReplacer( match, start, end, snippet );

    }