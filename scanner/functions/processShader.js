function processShader(shader, processingOptions) {

    Debug.assert(shader);
    const shaderDefinition = shader.definition;

    // 'shader' generator for a material - simply return existing shader definition. Use generator and getProgram
    // to allow for shader processing to be cached
    const name = shaderDefinition.name ?? 'shader';

    // unique name based of the shader id
    const key = `${name}-id-${shader.id}`;

    const materialGenerator = new ShaderGeneratorPassThrough(key, shaderDefinition);

    // temporarily register the program generator
    const libraryModuleName = 'shader';
    const library = getProgramLibrary(shader.device);
    Debug.assert(!library.isRegistered(libraryModuleName));
    library.register(libraryModuleName, materialGenerator);

    // generate shader variant - its the same shader, but with different processing options
    const variant = library.getProgram(libraryModuleName, {}, processingOptions);

    // unregister it again
    library.unregister(libraryModuleName);

    return variant;
}