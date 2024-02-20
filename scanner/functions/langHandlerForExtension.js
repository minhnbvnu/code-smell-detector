function langHandlerForExtension(extension, source) {
        if (!(extension && langHandlerRegistry.hasOwnProperty(extension))) {
          // Treat it as markup if the first non whitespace character is a < and
          // the last non-whitespace character is a >.
          extension = /^\s*</.test(source)
            ? 'default-markup'
            : 'default-code';
        }
        return langHandlerRegistry[extension];
      }