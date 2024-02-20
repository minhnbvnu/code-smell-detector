function getAddStringBodyParam (requestBody, dataFormat) {
  return `var body = ${requestBody[requestBody.mode]
    .split('\n')
    .map((line) => { return '@"' + line.replace(/"/g, '""') + '"'; })
    .join(' + "\\n" +\n')};\n` +
    `request.AddStringBody(body, ${dataFormat});\n`;
}