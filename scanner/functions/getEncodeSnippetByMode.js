function getEncodeSnippetByMode (mode) {
  const isForm = ['urlencoded'].includes(mode),
    isMultipart = ['formdata'].includes(mode);
  let snippet = '';
  if (isForm) {
    snippet = ', encode = \'form\'';
  }
  else if (isMultipart) {
    snippet = ', encode = \'multipart\'';
  }

  return snippet;
}