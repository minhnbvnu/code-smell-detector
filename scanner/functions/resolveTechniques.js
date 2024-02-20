function resolveTechniques(techniquesExtension, gltfScenegraph) {
    const { programs = [], shaders = [], techniques = [] } = techniquesExtension;
    const textDecoder = new TextDecoder();
    shaders.forEach((shader) => {
      if (Number.isFinite(shader.bufferView)) {
        shader.code = textDecoder.decode(gltfScenegraph.getTypedArrayForBufferView(shader.bufferView));
      } else {
        throw new Error("KHR_techniques_webgl: no shader code");
      }
    });
    programs.forEach((program) => {
      program.fragmentShader = shaders[program.fragmentShader];
      program.vertexShader = shaders[program.vertexShader];
    });
    techniques.forEach((technique) => {
      technique.program = programs[technique.program];
    });
    return techniques;
  }