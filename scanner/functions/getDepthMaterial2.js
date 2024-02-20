function getDepthMaterial2() {
  const material = new THREE.MeshDepthMaterial({depthPacking: THREE.RGBADepthPacking, side: THREE.DoubleSide});
  material.onBeforeCompile = (shader) =>{
    shader.vertexShader = shader.vertexShader.replace(
      `#include <common>`,
      `#include <common>
  varying vec3 pos;`);
    shader.vertexShader = shader.vertexShader.replace(
      `#include <begin_vertex>`,
      `#include <begin_vertex>
  pos = position.xyz;`);

   shader.fragmentShader = shader.fragmentShader.replace(
      `#include <common>`,
      `#include <common>
  varying vec3 pos;

#define M_PI 3.1415926535897932384626433832795
#define M_TAU (2.*M_PI)

float pattern(vec3 pos){
  float r = sqrt(dot(pos,pos));
  float theta = acos(pos.z/r);
  float phi = atan(pos.y,pos.x);
  float v = theta / M_TAU;
  float v2 = phi / M_PI;
  float m1 = .5+.5*sin(v*M_TAU*16. + v2 * M_TAU + M_PI);
  float res = m1;
  return res;
}
`);

   shader.fragmentShader = shader.fragmentShader.replace(
      `vec4 diffuseColor = vec4( 1.0 );`,
      `vec4 diffuseColor = vec4( 1.0 );
      float strip = pattern(pos);
      if( smoothstep(.49,.51,strip) >.5){
        discard;
      }`);

  }
  return material;
}