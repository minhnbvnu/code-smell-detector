function generateMultipartFormData (requestbody) {
  const boundary = '------WebKitFormBoundary7MA4YWxkTrZu0gW\\r\\nContent-Disposition: form-data; ',
    dataArray = requestbody[requestbody.mode];
  var postData = '';

  if (dataArray.length) {
    postData = '"' + boundary + _.reduce(dataArray, (accumalator, dataArrayElement) => {
      if (!dataArrayElement.disabled || dataArrayElement.disabled === false) {
        const key = dataArrayElement.key.replace(/"/g, '\'');

        if (dataArrayElement.type === 'file') {
          var pathArray = dataArrayElement.src.split(path.sep),
            fileName = pathArray[pathArray.length - 1];
          const filename = `filename=\\"${fileName}\\"`,
            contentType = 'Content-Type: \\"{Insert_File_Content_Type}\\"',
            fileContent = `fs.readFileSync('${dataArrayElement.src}')`;

          // eslint-disable-next-line max-len
          accumalator.push(`name=\\"${key}\\"; ${filename}\\r\\n${contentType}\\r\\n\\r\\n" + ${fileContent} + "\\r\\n`);
        }
        else {
          // eslint-disable-next-line no-useless-escape
          const value = dataArrayElement.value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
          let field = `name=\\"${key}\\"\\r\\n`;
          if (dataArrayElement.contentType) {
            field += `Content-Type: ${dataArrayElement.contentType}\\r\\n`;
          }
          field += `\\r\\n${value}\\r\\n`;
          accumalator.push(field);
        }
      }
      return accumalator;
      // eslint-disable-next-line no-useless-escape
    }, []).join(`${boundary}`) + '------WebKitFormBoundary7MA4YWxkTrZu0gW--\"';
  }

  return postData;
}