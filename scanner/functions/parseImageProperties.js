function parseImageProperties(style, builder, uniforms, prefix, textureId) {
  const image = new Image();
  let size;
  image.crossOrigin =
    style[`${prefix}cross-origin`] === undefined
      ? 'anonymous'
      : style[`${prefix}cross-origin`];
  image.src = style[`${prefix}src`];

  if (image.complete && image.width && image.height) {
    size = arrayToGlsl([image.width, image.height]);
  } else {
    // the size is provided asynchronously using a uniform
    uniforms[`u_texture${textureId}_size`] = () => {
      return image.complete ? [image.width, image.height] : [0, 0];
    };
    builder.addUniform(`vec2 u_texture${textureId}_size`);
    size = `u_texture${textureId}_size`;
  }
  uniforms[`u_texture${textureId}`] = image;
  builder.addUniform(`sampler2D u_texture${textureId}`);
  return size;
}