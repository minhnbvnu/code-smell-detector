function evaluateCode(code, type) {
  let Builder;
  let wrappedCode;

  switch (type) {
    case 'metadata':
      Builder = XVIZMetadataBuilder;
      wrappedCode = `function fn(xvizMetadataBuilder) {
        ${code}
        return xvizMetadataBuilder.getMetadata();
      }`;
      break;

    case 'frame':
      Builder = XVIZBuilder;
      wrappedCode = `function fn(xvizBuilder) {
        ${code}
        return xvizBuilder.getFrame();
      }`;
      break;

    default:
  }

  try {
    const func = eval(`(function() { return ${wrappedCode} })()`);
    const result = func(new Builder());

    if (!result || typeof result !== 'object') {
      throw new Error('Invalid JSON object');
    }
    return {error: null, data: result};
  } catch (error) {
    return {error, data: null};
  }
}