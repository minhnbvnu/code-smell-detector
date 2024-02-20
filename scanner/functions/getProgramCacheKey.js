function getProgramCacheKey( parameters ) {

    		const array = [];

    		if ( parameters.shaderID ) {

    			array.push( parameters.shaderID );

    		} else {

    			array.push( hashString( parameters.fragmentShader ) );
    			array.push( hashString( parameters.vertexShader ) );

    		}

    		if ( parameters.defines !== undefined ) {

    			for ( const name in parameters.defines ) {

    				array.push( name );
    				array.push( parameters.defines[ name ] );

    			}

    		}

    		if ( parameters.isRawShaderMaterial === false ) {

    			for ( let i = 0; i < parameterNames.length; i ++ ) {

    				array.push( parameters[ parameterNames[ i ] ] );

    			}

    			array.push( renderer.outputEncoding );
    			array.push( renderer.gammaFactor );

    		}

    		array.push( parameters.customProgramCacheKey );

    		return array.join();

    	}