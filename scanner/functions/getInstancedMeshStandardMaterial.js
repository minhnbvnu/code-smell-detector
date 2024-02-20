function getInstancedMeshStandardMaterial(options = {}, instanceOptions = {}) {
  let material;
  if (options.transparent) {
    material = new THREE.MeshPhongMaterial({
      color: options.color || 0xffffff,
      wireframe: options.wireframe || false,
      transparent: true,
      depthWrite: options.depthWrite || false,
      depthTest: options.depthTest || true,
      side: options.side || THREE.FrontSide,
    });
  } else {
    material = new THREE.MeshStandardMaterial({
      color: options.color || 0xffffff,
      map: options.map || null,
      normalMap: options.normalMap || null,
      transparent: false,
      wireframe: options.wireframe || false,
      metalness: options.metalness !== undefined ? options.metalness : .5,
      roughness: options.roughness !== undefined ? options.roughness : .5,
      depthWrite: options.depthWrite || true,
      depthTest: options.depthTest || true,
      side: options.side || THREE.FrontSide,
    });
  }

  material.onBeforeCompile = (shader) => {
    shader.vertexShader = `attribute vec3 instancePosition;
attribute vec4 instanceQuaternion;
attribute vec3 instanceScale;
attribute vec4 instanceColor;
attribute float instanceRoughness;
attribute float instanceMetalness;
varying vec4 VIColor;
varying float VIRoughness;
varying float VIMetalness;
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
VIColor = instanceColor;
VIRoughness = instanceRoughness;
VIMetalness = instanceMetalness;
`);

    shader.vertexShader = shader.vertexShader.replace(
      '#include <defaultnormal_vertex>',
      `#include <defaultnormal_vertex>
transformedNormal = normalMatrix * applyTRS(objectNormal, vec3(0.), instanceQuaternion, vec3(1.));
`);

    shader.fragmentShader = `varying vec4 VIColor;
varying float VIRoughness;
varying float VIMetalness;
${shader.fragmentShader}`;

    if (instanceOptions.colors) {
      shader.fragmentShader = shader.fragmentShader.replace(
        'vec4 diffuseColor = vec4( diffuse, opacity );',
        `vec4 diffuseColor = VIColor;`);
    }
  };

  material.onAfterIncludes = function(type, source) {

    if (type === 1) {
      if (instanceOptions.roughness) {
        source = source.replace(
          'float roughnessFactor = roughness;',
          `float roughnessFactor = VIRoughness;`);
      }
      if (instanceOptions.metalness) {
        source = source.replace(
          'float metalnessFactor = metalness;',
          `float metalnessFactor = VIMetalness;`);
      }
    }
    return source;
  }

  return material;
}