function internalize(holder, name, reviver) {
    var value = holder[name];

    if (value != null && typeof value === 'object') {
      for (var key in value) {
        var replacement = internalize(value, key, reviver);

        if (replacement === undefined) {
          delete value[key];
        } else {
          value[key] = replacement;
        }
      }
    }

    return reviver.call(holder, name, value);
  }