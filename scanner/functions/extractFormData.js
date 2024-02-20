function extractFormData (dataArray, indentString, trimBody) {
  if (!dataArray) {
    return '';
  }
  var snippetString = _.reduce(dataArray, (accumalator, item) => {
    if (item.disabled) {
      return accumalator;
    }
    /* istanbul ignore next */
    if (item.type === 'file') {
      /**
             * creating snippet to send file in nodejs request
             * for example:
             *  'fieldname': {
             *      'value': fs.createStream('filename.ext'),
             *      'options': {
             *          'filename': 'filename.ext',
             *          'contentType: null
             *          }
             *      }
             *  }
             */
      if (Array.isArray(item.src) && item.src.length) {
        let fileSnippet = '',
          fileArray = [];
        _.forEach(item.src, (filePath) => {
          fileArray.push(`${indentString.repeat(3)}fs.createReadStream('${sanitize(filePath, trimBody)}')`);
        });
        if (fileArray.length) {
          fileSnippet += `${indentString.repeat(2)}'${sanitize(item.key, trimBody)}': ` +
          `[\n${fileArray.join(',\n')}\n${indentString.repeat(2)}]`;
          accumalator.push(fileSnippet);
        }
        else {
          return accumalator;
        }
      }
      else if (typeof item.src !== 'string') {
        accumalator.push([
          indentString.repeat(2) + `'${sanitize(item.key, trimBody)}': {`,
          indentString.repeat(3) + '\'value\': fs.createReadStream(\'/path/to/file\'),',
          indentString.repeat(3) + '\'options\': {',
          indentString.repeat(4) + '\'filename\': \'filename\'',
          indentString.repeat(4) + '\'contentType\': null',
          indentString.repeat(3) + '}',
          indentString.repeat(2) + '}'
        ].join('\n'));
      }
      else {
        var pathArray = item.src.split(path.sep),
          fileName = pathArray[pathArray.length - 1];
        accumalator.push([
          indentString.repeat(2) + `'${sanitize(item.key, trimBody)}': {`,
          indentString.repeat(3) + `'value': fs.createReadStream('${sanitize(item.src, trimBody)}'),`,
          indentString.repeat(3) + '\'options\': {',
          indentString.repeat(4) + `'filename': '${sanitize(fileName, trimBody)}',`,
          indentString.repeat(4) + '\'contentType\': null',
          indentString.repeat(3) + '}',
          indentString.repeat(2) + '}'
        ].join('\n'));
      }
    }
    else {
      accumalator.push(
        indentString.repeat(2) +
                `'${sanitize(item.key, trimBody)}': '${sanitize(item.value, trimBody)}'`
      );
    }
    return accumalator;
  }, []);
  return snippetString.join(',\n') + '\n';
}