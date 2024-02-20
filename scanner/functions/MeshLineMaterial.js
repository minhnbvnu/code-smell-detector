function MeshLineMaterial(parameters) {

  var vertexShaderSource = [
    'precision highp float;',
    '',
    'attribute vec3 position;',
    'attribute vec3 previous;',
    'attribute vec3 next;',
    'attribute float side;',
    'attribute float width;',
    'attribute vec2 uv;',
    'attribute float counters;',
    '',
    'uniform mat4 projectionMatrix;',
    'uniform mat4 modelViewMatrix;',
    'uniform vec2 resolution;',
    'uniform float lineWidth;',
    'uniform vec3 color;',
    'uniform float opacity;',
    'uniform float near;',
    'uniform float far;',
    'uniform float sizeAttenuation;',
    '',
    'varying vec2 vUV;',
    'varying vec4 vColor;',
    'varying float vCounters;',
    '',
    'vec2 fix( vec4 i, float aspect ) {',
    '',
    '    vec2 res = i.xy / i.w;',
    '    res.x *= aspect;',
    '    vCounters = counters;',
    '    return res;',
    '',
    '}',
    '',
    'void main() {',
    '',
    '    float aspect = resolution.x / resolution.y;',
    '  float pixelWidthRatio = 1. / (resolution.x * projectionMatrix[0][0]);',
    '',
    '    vColor = vec4( color, opacity );',
    '    vUV = uv;',
    '',
    '    mat4 m = projectionMatrix * modelViewMatrix;',
    '    vec4 finalPosition = m * vec4( position, 1.0 );',
    '    vec4 prevPos = m * vec4( previous, 1.0 );',
    '    vec4 nextPos = m * vec4( next, 1.0 );',
    '',
    '    vec2 currentP = fix( finalPosition, aspect );',
    '    vec2 prevP = fix( prevPos, aspect );',
    '    vec2 nextP = fix( nextPos, aspect );',
    '',
    '  float pixelWidth = finalPosition.w * pixelWidthRatio;',
    '    float w = 1.8 * pixelWidth * lineWidth * width;',
    '',
    '    if( sizeAttenuation == 1. ) {',
    '        w = 1.8 * lineWidth * width;',
    '    }',
    '',
    '    vec2 dir;',
    '    if( nextP == currentP ) dir = normalize( currentP - prevP );',
    '    else if( prevP == currentP ) dir = normalize( nextP - currentP );',
    '    else {',
    '        vec2 dir1 = normalize( currentP - prevP );',
    '        vec2 dir2 = normalize( nextP - currentP );',
    '        dir = normalize( dir1 + dir2 );',
    '',
    '        vec2 perp = vec2( -dir1.y, dir1.x );',
    '        vec2 miter = vec2( -dir.y, dir.x );',
    '        //w = clamp( w / dot( miter, perp ), 0., 4. * lineWidth * width );',
    '',
    '    }',
    '',
    '    //vec2 normal = ( cross( vec3( dir, 0. ), vec3( 0., 0., 1. ) ) ).xy;',
    '    vec2 normal = vec2( -dir.y, dir.x );',
    '    normal.x /= aspect;',
    '    normal *= .5 * w;',
    '',
    '    vec4 offset = vec4( normal * side, 0.0, 1.0 );',
    '    finalPosition.xy += offset.xy;',
    '',
    '    gl_Position = finalPosition;',
    '',
    '}'
  ];

  var fragmentShaderSource = [
    `#extension GL_OES_standard_derivatives : enable
    precision mediump float;

    uniform sampler2D map;
    uniform sampler2D alphaMap;
    uniform float useMap;
    uniform float useAlphaMap;
    uniform float useDash;
    uniform vec2 dashArray;
    uniform float dashOffset;
    uniform float visibility;
    uniform float alphaTest;
    uniform vec2 repeat;

    varying vec2 vUV;
    varying vec4 vColor;
    varying float vCounters;

    void main() {
      vec4 c = vColor;
      vec2 tuv = vUV * repeat;
      if(useDash == 1.) {
        tuv.x = mod((tuv.x + dashOffset),1.);
      }
      if( useMap == 1. ) c *= texture2D(map, tuv);
      if( useAlphaMap == 1. ) c.a *= texture2D( alphaMap, tuv ).a;
      if( useDash == 1. ){
        if(mod(vCounters*repeat.x+dashOffset,1.)>(dashArray.x / (dashArray.x+dashArray.y))) {
          c.a = 0.;
        }
      }
      if( c.a < alphaTest ) discard;
      gl_FragColor = c;
      gl_FragColor.a *= step(vCounters,visibility);
    }`
  ];

  function check(v, d) {
    if (v === undefined) return d;
    return v;
  }

  THREE.Material.call(this);

  parameters = parameters || {};

  this.lineWidth = check(parameters.lineWidth, 1);
  this.map = check(parameters.map, null);
  this.useMap = check(parameters.useMap, 0);
  this.alphaMap = check(parameters.alphaMap, null);
  this.useAlphaMap = check(parameters.useAlphaMap, 0);
  this.color = check(parameters.color, new THREE.Color(0xffffff));
  this.opacity = check(parameters.opacity, 1);
  this.resolution = check(parameters.resolution, new THREE.Vector2(1, 1));
  this.sizeAttenuation = check(parameters.sizeAttenuation, 1);
  this.near = check(parameters.near, 1);
  this.far = check(parameters.far, 1);
  this.dashArray = check(parameters.dashArray, new THREE.Vector2(1, 0));
  this.dashRatio = check(parameters.dashRatio, 0);
  this.dashOffset = check(parameters.dashOffset, 0);
  this.useDash = (this.dashArray) ? 1 : 0;
  this.visibility = check(parameters.visibility, 1);
  this.alphaTest = check(parameters.alphaTest, 0);
  this.repeat = check(parameters.repeat, new THREE.Vector2(1, 1));

  var material = new THREE.RawShaderMaterial({
    uniforms: {
      lineWidth: { value: this.lineWidth },
      map: { value: this.map },
      useMap: { value: this.useMap },
      alphaMap: { value: this.alphaMap },
      useAlphaMap: { value: this.useAlphaMap },
      color: { value: this.color },
      opacity: { value: this.opacity },
      resolution: { value: this.resolution },
      sizeAttenuation: { value: this.sizeAttenuation },
      near: { value: this.near },
      far: { value: this.far },
      dashArray: { value: this.dashArray },
      dashOffset: { value: this.dashOffset },
      useDash: { value: this.useDash },
      visibility: { value: this.visibility },
      alphaTest: { value: this.alphaTest },
      repeat: { value: this.repeat }
    },
    vertexShader: vertexShaderSource.join('\r\n'),
    fragmentShader: fragmentShaderSource.join('\r\n')
  });

  delete parameters.lineWidth;
  delete parameters.map;
  delete parameters.useMap;
  delete parameters.alphaMap;
  delete parameters.useAlphaMap;
  delete parameters.color;
  delete parameters.opacity;
  delete parameters.resolution;
  delete parameters.sizeAttenuation;
  delete parameters.near;
  delete parameters.far;
  delete parameters.dashArray;
  delete parameters.dashOffset;
  delete parameters.dashRatio;
  delete parameters.visibility;
  delete parameters.alphaTest;
  delete parameters.repeat;

  material.type = 'MeshLineMaterial';

  material.setValues(parameters);

  return material;

}