function getContext(canvas, attributes) {
  attributes = Object.assign(
    {
      preserveDrawingBuffer: true,
      antialias: SAFARI_BUG_237906 ? false : true, // https://bugs.webkit.org/show_bug.cgi?id=237906
    },
    attributes,
  );
  const ii = CONTEXT_IDS.length;
  for (let i = 0; i < ii; ++i) {
    try {
      const context = canvas.getContext(CONTEXT_IDS[i], attributes);
      if (context) {
        return /** @type {!WebGLRenderingContext} */ (context);
      }
    } catch (e) {
      // pass
    }
  }
  return null;
}