function serialize(toSerialize, prefix, topLevel) {
        if (toSerialize === null || isUndefined(toSerialize)) return;
        if (isArray(toSerialize)) {
          forEach(toSerialize, function(value, index) {
            serialize(value, prefix + '[' + (isObject(value) ? index : '') + ']');
          });
        } else if (isObject(toSerialize) && !isDate(toSerialize)) {
          forEachSorted(toSerialize, function(value, key) {
            serialize(value, prefix +
                (topLevel ? '' : '[') +
                key +
                (topLevel ? '' : ']'));
          });
        } else {
          parts.push(encodeUriQuery(prefix) + '=' + encodeUriQuery(serializeValue(toSerialize)));
        }
      }