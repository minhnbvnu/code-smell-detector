function buildBabelOptions(script) {
	  return {
	    presets: script.presets || ['react', 'es2015'],
	    plugins: script.plugins || ['transform-class-properties', 'transform-object-rest-spread', 'transform-flow-strip-types'],
	    sourceMaps: 'inline'
	  };
	}