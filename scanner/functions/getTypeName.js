function getTypeName(type) {
          var ptr = ___getTypeName(type);
          var rv = readLatin1String(ptr);
          _free(ptr);
          return rv;
        }