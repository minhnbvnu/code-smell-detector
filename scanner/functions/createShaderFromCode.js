function createShaderFromCode(device, vsCode, fsCode, uniqueName, attributes, useTransformFeedback = false) {

    // the function signature has changed, fail if called incorrectly
    Debug.assert(typeof attributes !== 'boolean');

    const programLibrary = getProgramLibrary(device);
    let shader = programLibrary.getCachedShader(uniqueName);
    if (!shader) {
        shader = new Shader(device, ShaderUtils.createDefinition(device, {
            name: uniqueName,
            vertexCode: vsCode,
            fragmentCode: fsCode,
            attributes: attributes,
            useTransformFeedback: useTransformFeedback
        }));
        programLibrary.setCachedShader(uniqueName, shader);
    }
    return shader;
}