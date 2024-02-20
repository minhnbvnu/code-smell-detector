function serializeUniforms(uniforms) {

    var serialized = {};

    for ( var name in uniforms ) {

        var uniform = uniforms[ name ];
        var value = uniform.value;

        if ( value === null) {

            serialized[ name ] = { value: null };

        } else if ( value.isTexture ) {

            serialized[ name ] = {
                type: 't',
                value: value.ipymodelId
            };

        } else if ( value.isColor ) {

            serialized[ name ] = {
                type: 'c',
                value: '#' + value.getHexString()
            };

        } else if ( value.isVector2 ) {

            serialized[ name ] = {
                type: 'v2',
                value: value.toArray()
            };

        } else if ( value.isVector3 ) {

            serialized[ name ] = {
                type: 'v3',
                value: value.toArray()
            };

        } else if ( value.isVector4 ) {

            serialized[ name ] = {
                type: 'v4',
                value: value.toArray()
            };

        } else if ( value.isMatrix3 ) {

            serialized[ name ] = {
                type: 'm3',
                value: value.toArray()
            };

        } else if ( value.isMatrix4 ) {

            serialized[ name ] = {
                type: 'm4',
                value: value.toArray()
            };

        } else {

            serialized[ name ] = {
                value: value
            };

            // note: the array variants v2v, v3v, v4v, m4v and tv are not supported so far

        }

    }

    return serialized;

}