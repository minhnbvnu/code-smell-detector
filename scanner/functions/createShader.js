function createShader (el, shaderName, data) {
  var shader;
  var shaderObject;

  // Set up Shader.
  shaderObject = new shaders[shaderName].Shader();
  shaderObject.el = el;
  shaderObject.init(data);
  shaderObject.update(data);

  // Get material.
  shader = shaderObject.material;
  // Apparently, was not set on `init` nor `update`.
  shader.transparent = data.transparent;

  return {
    material: shader,
    shader: shaderObject
  };
}