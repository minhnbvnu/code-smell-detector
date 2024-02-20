function parseFormUrlEncoded (builder, requestBody) {
  let list = requestBody[requestBody.mode].reduce((collection, data) => {
    if (data.disabled) {
      return collection;
    }

    (!data.value) && (data.value = '');
    collection.push('collection.Add(new' +
      `("${sanitize(data.key)}", "${sanitize(data.value)}"));`);

    return collection;
  }, []);

  if (list && !_.isEmpty(list)) {
    builder.appendLine('var collection = new List<KeyValuePair<string, string>>();');
    builder.appendLines(list);
    builder.appendLine('var content = new FormUrlEncodedContent(collection);');
    builder.appendLine('request.Content = content;');
    builder.addUsing('System.Collections.Generic');
  }
}