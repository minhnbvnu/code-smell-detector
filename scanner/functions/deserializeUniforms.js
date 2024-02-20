function deserializeUniforms(serialized, manager) {
    var uniforms = {};
    var refs = [];

    for ( var name in serialized ) {

        var uniform = serialized[ name ];
        var value = uniform.value;

        switch (uniform.type) {

        case 't':
            refs.push(unpackThreeObj(value, manager).then(function(obj) {
                uniforms[ name ] = { value: obj };
            }));
            break;

        case 'c':
            uniforms[ name ] = { value: new THREE.Color().set( uniform.value ) };
            break;

        case 'v2':
            uniforms[ name ] = { value: new THREE.Vector2().fromArray( uniform.value ) };
            break;

        case 'v3':
            uniforms[ name ] = { value: new THREE.Vector3().fromArray( uniform.value ) };
            break;

        case 'v4':
            uniforms[ name ] = { value: new THREE.Vector4().fromArray( uniform.value ) };
            break;

        case 'm3':
            uniforms[ name ] = { value: new THREE.Matrix3().fromArray( uniform.value ) };
            break;

        case 'm4':
            uniforms[ name ] = { value: new THREE.Matrix4().fromArray( uniform.value ) };
            break;

        default:
            uniforms[ name ] = { value: uniform.value };

        }

    }

    // Resolve any widget refs
    return Promise.all(refs).then(function() {
        return uniforms;
    });
}