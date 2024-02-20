function buildFormDataParamFile (data, indentation, bodyTrim, index) {
  return `file${index} = fileUpload(\n` +
    `${indentation.repeat(1)}filename = path.expand('${sanitizeString(data.src, bodyTrim)}')` +
    ')\n';
}