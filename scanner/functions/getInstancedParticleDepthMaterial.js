function getInstancedParticleDepthMaterial() {
  const material = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, side: THREE.DoubleSide });

  material.onBeforeCompile = (shader) => {
    shader.vertexShader = `attribute vec3 instancePosition;
attribute vec4 instanceQuaternion;
attribute vec3 instanceScale;
varying vec2 vUv;

${shader.vertexShader}`;

    shader.vertexShader = shader.vertexShader.replace(
      '#include <project_vertex>',
      `#include <project_vertex>
mvPosition = modelViewMatrix * vec4(instancePosition,1.) + vec4(instanceScale * position,0.);
gl_Position = projectionMatrix * mvPosition;
vUv = uv;
`);

    shader.fragmentShader = `varying vec2 vUv;

    ${shader.fragmentShader}`;

    shader.fragmentShader =
      shader.fragmentShader.replace('void main() {', `void main() {;
    float l = length(vUv);
    if (l>1./4.) { discard; }`);
  };
  return material;
}