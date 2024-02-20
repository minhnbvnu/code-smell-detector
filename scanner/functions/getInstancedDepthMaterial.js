function getInstancedDepthMaterial() {
  const material = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, side: THREE.DoubleSide });

  material.onBeforeCompile = (shader) => {
    shader.vertexShader = `attribute vec3 instancePosition;
attribute vec4 instanceQuaternion;
attribute vec3 instanceScale;
vec3 applyTRS( vec3 position, vec3 translation, vec4 quaternion, vec3 scale ) {
  position *= scale;
  position += 2.0 * cross( quaternion.xyz, cross( quaternion.xyz, position ) + quaternion.w * position );
  return position + translation;
}
${shader.vertexShader}`;

    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
transformed = applyTRS(position, instancePosition, instanceQuaternion, instanceScale);
`);
  };
  return material;
}