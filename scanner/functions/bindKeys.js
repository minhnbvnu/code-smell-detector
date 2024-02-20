function bindKeys(keys, modifier) {
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          if (!modifier && key.length == 1) {
            // Wrap all keys without modifiers with '' to identify them by their
            // key characters instead of key identifiers.
            key = "'" + key + "'";
          }
          var vimKey = cmKeyToVimKey(keys[i], modifier);
          var cmKey = modifier ? modifier + '-' + key : key;
          cmToVimKeymap[cmKey] = keyMapper(vimKey);
        }
      }