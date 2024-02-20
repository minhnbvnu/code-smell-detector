function parseFormData (body, mode, trim, indent) {
  var parameters = [],
    parameter,
    bodySnippet;
  _.forEach(body, (data) => {
    if (!(data.disabled)) {
      parameter = '';
      parameter += `${indent}[\n${indent.repeat(2)}"key": "${sanitize(data.key, mode, trim)}",\n`;
      if (data.type === 'file') {
        parameter += `${indent.repeat(2)}"src": "${sanitize(data.src, mode, trim)}",\n`;
        parameter += `${indent.repeat(2)}"type": "file"\n${indent}]`;
      }
      else {
        parameter += `${indent.repeat(2)}"value": "${sanitize(data.value, mode, trim)}",\n`;
        parameter += `${indent.repeat(2)}"type": "text"`;
        if (data.contentType) {
          parameter += `,\n${indent.repeat(2)}"contentType": "${sanitize(data.contentType, mode, trim)}"`;
        }
        parameter += `\n${indent}]`;
      }
      parameters.push(parameter);
    }
  });
  parameters = '[\n' + _.join(parameters, ',\n') + ']';
  bodySnippet = `let parameters = ${parameters} as [[String: Any]]\n\n`;
  bodySnippet += 'let boundary = "Boundary-\\(UUID().uuidString)"\n';
  bodySnippet += 'var body = Data()\nvar error: Error? = nil\n';
  bodySnippet += 'for param in parameters {\n';
  bodySnippet += `${indent}if param["disabled"] != nil { continue }\n`;
  bodySnippet += `${indent}let paramName = param["key"]!\n`;
  bodySnippet += `${indent}body += Data("--\\(boundary)\\r\\n".utf8)\n`;
  // eslint-disable-next-line no-useless-escape
  bodySnippet += `${indent}body += Data("Content-Disposition:form-data; name=\\"\\(paramName)\\"\".utf8)\n`;
  bodySnippet += `${indent}if param["contentType"] != nil {\n`;
  bodySnippet += `${indent.repeat(2)}body += Data("\\r\\nContent-Type: \\(param["contentType"] as! String)".utf8)\n`;
  bodySnippet += `${indent}}\n`;
  bodySnippet += `${indent}let paramType = param["type"] as! String\n`;
  bodySnippet += `${indent}if paramType == "text" {\n`;
  bodySnippet += `${indent.repeat(2)}let paramValue = param["value"] as! String\n`;
  bodySnippet += `${indent.repeat(2)}body += Data("\\r\\n\\r\\n\\(paramValue)\\r\\n".utf8)\n`;
  bodySnippet += `${indent}} else {\n`;
  bodySnippet += `${indent.repeat(2)}let paramSrc = param["src"] as! String\n`;
  bodySnippet += `${indent.repeat(2)}let fileURL = URL(fileURLWithPath: paramSrc)\n`;
  bodySnippet += `${indent.repeat(2)}if let fileContent = try? Data(contentsOf: fileURL) {\n`;
  bodySnippet += `${indent.repeat(3)}body += Data("; filename=\\"\\(paramSrc)\\"\\r\\n".utf8)\n`;
  bodySnippet += `${indent.repeat(3)}body += Data("Content-Type: \\"content-type header\\"\\r\\n".utf8)\n`;
  bodySnippet += `${indent.repeat(3)}body += Data("\\r\\n".utf8)\n`;
  bodySnippet += `${indent.repeat(3)}body += fileContent\n`;
  bodySnippet += `${indent.repeat(3)}body += Data("\\r\\n".utf8)\n`;
  bodySnippet += `${indent.repeat(2)}}\n`;
  bodySnippet += `${indent}}\n`;
  bodySnippet += '}\n';
  bodySnippet += 'body += Data("--\\(boundary)--\\r\\n".utf8);\n';
  bodySnippet += 'let postData = body\n';
  return bodySnippet;
}