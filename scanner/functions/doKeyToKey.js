function doKeyToKey(keys) {
          // TODO: prevent infinite recursion.
          var match;
          while (keys) {
            // Pull off one command key, which is either a single character
            // or a special sequence wrapped in '<' and '>', e.g. '<Space>'.
            match = (/<\w+-.+?>|<\w+>|./).exec(keys);
            key = match[0];
            keys = keys.substring(match.index + key.length);
            CodeMirror.Vim.handleKey(cm, key, 'mapping');
          }
        }