function Cct(){return`
  // Index of the specific vertex (passed in as bufferAttribute), and the
  // variable that will be used to pass it to the fragment shader.
  attribute float spriteIndex;
  attribute vec3 color;
  attribute float scaleFactor;

  varying vec2 xyIndex;
  varying vec3 vColor;

  uniform bool sizeAttenuation;
  uniform float pointSize;
  uniform float spritesPerRow;
  uniform float spritesPerColumn;

  ${ue.fog_pars_vertex}

  void main() {
    // Pass index and color values to fragment shader.
    vColor = color;
    xyIndex = vec2(mod(spriteIndex, spritesPerRow),
              floor(spriteIndex / spritesPerColumn));

    // Transform current vertex by modelViewMatrix (model world position and
    // camera world position matrix).
    vec4 cameraSpacePos = modelViewMatrix * vec4(position, 1.0);

    // Project vertex in camera-space to screen coordinates using the camera's
    // projection matrix.
    gl_Position = projectionMatrix * cameraSpacePos;

    // Create size attenuation (if we're in 3D mode) by making the size of
    // each point inversly proportional to its distance to the camera.
    float outputPointSize = pointSize;
    if (sizeAttenuation) {
      outputPointSize = -pointSize / cameraSpacePos.z;
    } else {  // Create size attenuation (if we're in 2D mode)
      const float PI = 3.1415926535897932384626433832795;
      const float minScale = 0.1;  // minimum scaling factor
      const float outSpeed = 2.0;  // shrink speed when zooming out
      const float outNorm = (1. - minScale) / atan(outSpeed);
      const float maxScale = 15.0;  // maximum scaling factor
      const float inSpeed = 0.02;  // enlarge speed when zooming in
      const float zoomOffset = 0.3;  // offset zoom pivot
      float zoom = projectionMatrix[0][0] + zoomOffset;  // zoom pivot
      float scale = zoom < 1. ? 1. + outNorm * atan(outSpeed * (zoom - 1.)) :
                    1. + 2. / PI * (maxScale - 1.) * atan(inSpeed * (zoom - 1.));
      outputPointSize = pointSize * scale;
    }

    gl_PointSize =
      max(outputPointSize * scaleFactor, ${wct.toFixed(1)});
  }`}