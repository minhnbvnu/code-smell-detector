function ShaderMaterial(parameters) {

  Material.call(this);

  this.type = 'ShaderMaterial';

  this.defines = {};
  this.uniforms = {};

  this.vertexShader = 'void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}';
  this.fragmentShader = 'void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}';

  this.linewidth = 1;

  this.wireframe = false;
  this.wireframeLinewidth = 1;

  this.fog = false; // set to use scene fog
  this.lights = false; // set to use scene lights
  this.clipping = false; // set to use user-defined clipping planes

  this.skinning = false; // set to use skinning attribute streams
  this.morphTargets = false; // set to use morph targets
  this.morphNormals = false; // set to use morph normals

  this.extensions = {
    derivatives: false, // set to use derivatives
    fragDepth: false, // set to use fragment depth values
    drawBuffers: false, // set to use draw buffers
    shaderTextureLOD: false // set to use shader texture LOD
  };

  // When rendered geometry doesn't include these attributes but the material does,
  // use these default values in WebGL. This avoids errors when buffer data is missing.
  this.defaultAttributeValues = {
    'color': [1, 1, 1],
    'uv': [0, 0],
    'uv2': [0, 0]
  };

  this.index0AttributeName = undefined;
  this.uniformsNeedUpdate = false;

  if (parameters !== undefined) {

    if (parameters.attributes !== undefined) {

      console.error('THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead.');

    }

    this.setValues(parameters);

  }

}