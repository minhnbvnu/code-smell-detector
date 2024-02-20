function fixFragmentShader(mat, shader) {
  shader.fragmentShader = `uniform float time;
  varying float vDepth;
  varying vec3 vNormal;
${shader.fragmentShader}`;
  shader.fragmentShader = shader.fragmentShader.replace('gl_FragColor = vec4( outgoingLight, diffuseColor.a );',
    `
gl_FragColor = vec4(-vNormal.x, vDepth, 0.,1.);`);
}