function Mct(){return`
  varying vec2 xyIndex;
  varying vec3 vColor;

  uniform sampler2D spriteTexture;
  uniform float spritesPerRow;
  uniform float spritesPerColumn;
  uniform bool isImage;

  ${ue.common}
  ${ue.fog_pars_fragment}
  ${s7}

  void main() {
    if (isImage) {
      // Coordinates of the vertex within the entire sprite image.
      vec2 coords =
        (gl_PointCoord + xyIndex) / vec2(spritesPerRow, spritesPerColumn);
      if (texture2D(spriteTexture, coords).a==0.0) {
        discard;
      }
      gl_FragColor = vec4(vColor, 1.0) * texture2D(spriteTexture, coords);
    } else {
      bool inside = point_in_unit_circle(gl_PointCoord);
      if (!inside) {
        discard;
      }
      gl_FragColor = vec4(vColor, 1);
    }
    ${ue.fog_fragment}
  }`}