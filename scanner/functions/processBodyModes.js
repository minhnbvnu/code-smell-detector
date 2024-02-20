function processBodyModes (body, indentation, bodyTrim, contentType) {
  let bodySnippet = '';
  switch (body.mode) {
    case 'urlencoded': {
      bodySnippet = parseURLEncodedBody(body.urlencoded, indentation, bodyTrim);
      return bodySnippet === '' ? '' : `params = ${bodySnippet}\n`;
    }
    case 'raw': {
      bodySnippet = parseRawBody(body.raw, indentation, bodyTrim, contentType);
      return bodySnippet === '' ? '' : `params = ${bodySnippet}\n`;
    }
    case 'graphql': {
      bodySnippet = parseGraphQL(body.graphql, bodyTrim);
      return bodySnippet === '' ? '' : `params = ${bodySnippet}\n`;
    }
    case 'formdata': {
      let formData = parseFormData(body.formdata, indentation, bodyTrim),
        formParamsSnippet = formData.bodySnippet === '' ? '' : `params = ${formData.bodySnippet}\n`;
      return { bodySnippet: formParamsSnippet,
        fileSnippet: formData.fileSnippet,
        numberOfFiles: formData.numberOfFiles};
    }
    case 'file': {
      bodySnippet = parseFromFile();
      return bodySnippet === '' ? '' : `params = ${bodySnippet}\n`;
    }
    default: {
      bodySnippet = parseRawBody(body.raw, indentation, bodyTrim, contentType);
      return bodySnippet === '' ? '' : `params = ${bodySnippet}\n`;
    }
  }
}