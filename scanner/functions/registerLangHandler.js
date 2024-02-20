function registerLangHandler(handler, fileExtensions) {
        for (var i = fileExtensions.length; --i >= 0;) {
          var ext = fileExtensions[i];
          if (!langHandlerRegistry.hasOwnProperty(ext)) {
            langHandlerRegistry[ext] = handler;
          } else if (win['console']) {
            console['warn']('cannot override language handler %s', ext);
          }
        }
      }