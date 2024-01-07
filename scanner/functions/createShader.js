function createShader(device, vsName, fsName, useTransformFeedback = false) {
    return new Shader(device, ShaderUtils.createDefinition(device, {
        name: `${vsName}_${fsName}`,
        vertexCode: shaderChunks[vsName],
        fragmentCode: shaderChunks[fsName],
        useTransformFeedback: useTransformFeedback
    }));
}