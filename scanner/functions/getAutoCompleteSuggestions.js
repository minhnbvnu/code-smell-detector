function getAutoCompleteSuggestions(object) {
  object = object && Object.getPrototypeOf(object);

  if (!object) {
    return null;
  }

  if (object.constructor.hasOwnProperty('_autoCompleteSuggestions')) {
    return object.constructor._autoCompleteSuggestions;
  }

  const publicMethods = getPublicMethods(object);

  Object.defineProperty(object.constructor, '_autoCompleteSuggestions', {
    enumerable: false,
    value: Object.keys(publicMethods).map(name => ({
      name,
      args: publicMethods[name],
      caption: `${name}(${publicMethods[name].join(', ')})`,
      value: `.${name}()`,
      completer: dataCompleter
    }))
  });

  return object.constructor._autoCompleteSuggestions;
}