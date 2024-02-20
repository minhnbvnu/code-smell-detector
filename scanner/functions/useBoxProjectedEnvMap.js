function useBoxProjectedEnvMap(shader, envMapPosition, envMapSize) {
  // defines
  shader.defines.BOX_PROJECTED_ENV_MAP = '' // uniforms

  shader.uniforms.envMapPosition = {
    value: envMapPosition,
  }
  shader.uniforms.envMapSize = {
    value: envMapSize,
  }
  const line1 = new RegExp(
    escapeRegExp('vec3 worldNormal = inverseTransformDirection ( normal , viewMatrix ) ;').replaceAll(' ', '\\s*'),
    'g'
  )
  const line2 = new RegExp(
    escapeRegExp('reflectVec = inverseTransformDirection ( reflectVec , viewMatrix ) ;').replaceAll(' ', '\\s*'),
    'g'
  ) // vertex shader

  shader.vertexShader =
    'varying vec3 vWorldPosition;\n' + shader.vertexShader.replace('#include <worldpos_vertex>', worldposReplace) // fragment shader

  shader.fragmentShader =
    boxProjectDefinitions +
    '\n' +
    shader.fragmentShader
      .replace('#include <envmap_physical_pars_fragment>', ShaderChunk.envmap_physical_pars_fragment)
      .replace(
        line1,
        `vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
                ${getIBLIrradiance_patch}`
      )
      .replace(
        line2,
        `reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
                ${getIBLRadiance_patch}`
      )
}