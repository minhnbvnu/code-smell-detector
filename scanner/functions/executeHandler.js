function executeHandler(handler) {
          if (typeof handler == 'string') {
            CodeMirror.commands[handler](cm);
          } else {
            handler(cm);
          }
          return true;
        }