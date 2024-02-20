function parseFileData (body, indentation) {
  const bodySnippet = `${indentation}let bytes = std::fs::read("${sanitize(body.src)}")?;\n\n`,
    requestBodySnippet = `${indentation.repeat(2)}.body(bytes)\n`;

  return { bodySnippet, requestBodySnippet };
}