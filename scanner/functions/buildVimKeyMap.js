function buildVimKeyMap() {
      /**
       * Handle the raw key event from CodeMirror. Translate the
       * Shift + key modifier to the resulting letter, while preserving other
       * modifers.
       */
      function cmKeyToVimKey(key, modifier) {
        var vimKey = key;
        if (isUpperCase(vimKey) && modifier == 'Ctrl') {
            vimKey = vimKey.toLowerCase();
        }
        if (modifier) {
          // Vim will parse modifier+key combination as a single key.
          vimKey = modifier.charAt(0) + '-' + vimKey;
        }
        var specialKey = ({Enter:'CR',Backspace:'BS',Delete:'Del'})[vimKey];
        vimKey = specialKey ? specialKey : vimKey;
        vimKey = vimKey.length > 1 ? '<'+ vimKey + '>' : vimKey;
        return vimKey;
      }

      // Closure to bind CodeMirror, key, modifier.
      function keyMapper(vimKey) {
        return function(cm) {
          CodeMirror.signal(cm, 'vim-keypress', vimKey);
          CodeMirror.Vim.handleKey(cm, vimKey);
        };
      }

      var cmToVimKeymap = {
        'nofallthrough': true,
        'style': 'fat-cursor'
      };
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
      bindKeys(upperCaseAlphabet);
      bindKeys(lowerCaseAlphabet);
      bindKeys(upperCaseAlphabet, 'Ctrl');
      bindKeys(specialSymbols);
      bindKeys(specialSymbols, 'Ctrl');
      bindKeys(numbers);
      bindKeys(numbers, 'Ctrl');
      bindKeys(specialKeys);
      bindKeys(specialKeys, 'Ctrl');
      return cmToVimKeymap;
    }