function getStringOrSymbol(address) {
          var symbol = emval_symbols[address];
          if (symbol === void 0) {
            return readLatin1String(address);
          }
          return symbol;
        }