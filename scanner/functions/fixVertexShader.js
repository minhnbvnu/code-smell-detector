function fixVertexShader(mat, shader) {
  mat.uniforms = shader.uniforms;
  shader.uniforms.time = { value: 0 };

  shader.vertexShader = `uniform float time;
  varying float vDepth;
  varying vec3 vNormal;
${shader.vertexShader}`;

  shader.vertexShader = shader.vertexShader.replace(
    '#include <begin_vertex>',
    `#include <begin_vertex>
vNormal = normal;

vec3 p = position;
float factor = .3 * sin(time);
if(factor != 0.) {
  float theta = p.x*factor;
  float sint = sin(theta);
  float cost = cos(theta);

  transformed.x = -(p.y-1.0/factor)*sint;
  transformed.y =  (p.y-1.0/factor)*cost + 1.0/factor;
  transformed.z= p.z;
} else {
  transformed = position;
}

p = transformed;
factor = -.2;
float theta = p.z * factor;
float sint = sin(theta);
float cost = cos(theta);

transformed.z = -(p.x-1.0/factor)*sint;
transformed.x =  (p.x-1.0/factor)*cost + 1.0/factor;
transformed.y= p.y;

vec4 mVP = modelViewMatrix * vec4( transformed, 1.0 );
float l =.5* 10.;
vDepth = 1. - (-mVP.z/20. - .5);

`);
}