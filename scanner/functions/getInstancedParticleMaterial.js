function getInstancedParticleMaterial(transparent = false) {
  let material;
  if (transparent) {
    material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      depthWrite: false,
    });
  } else {
    material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });
  }

  material.onBeforeCompile = (shader) => {
    shader.vertexShader = `attribute vec3 instancePosition;
attribute vec3 instanceScale;
attribute vec4 instanceColor;
varying vec4 VIColor;
varying vec2 vUv;
${shader.vertexShader}`;

    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
VIColor = instanceColor;
vUv = uv;
`);

    shader.vertexShader = shader.vertexShader.replace(
      '#include <project_vertex>',
      `#include <project_vertex>
mvPosition = modelViewMatrix * vec4(instancePosition,1.) + vec4(instanceScale * position,0.);
gl_Position = projectionMatrix * mvPosition;
`);

    shader.fragmentShader = `varying vec4 VIColor;
varying vec2 vUv;

${shader.fragmentShader}`;

    shader.fragmentShader = shader.fragmentShader.replace(
      'vec4 diffuseColor = vec4( diffuse, opacity );',
      `vec4 diffuseColor = VIColor;
float l = length(vUv);
if (l>1./4.) { discard; }`);
  };
  return material;
}