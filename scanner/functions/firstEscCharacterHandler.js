function firstEscCharacterHandler(ch) {
      return function(cm){
        var keys = getOption('insertModeEscKeys');
        var firstEscCharacter = keys && keys.length > 1 && keys.charAt(0);
        if (!getOption('enableInsertModeEscKeys')|| firstEscCharacter !== ch) {
          return CodeMirror.Pass;
        } else {
          cm.replaceRange(ch, cm.getCursor(), cm.getCursor(), "+input");
          cm.setOption('keyMap', 'await-second');
          cm.state.vim.awaitingEscapeSecondCharacter = true;
          setTimeout(
              function(){
                if(cm.state.vim.awaitingEscapeSecondCharacter) {
                    cm.state.vim.awaitingEscapeSecondCharacter = false;
                    cm.setOption('keyMap', 'vim-insert');
                }
              },
              getOption('insertModeEscKeysTimeout'));
        }
      };
    }