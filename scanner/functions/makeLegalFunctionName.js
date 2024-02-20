function makeLegalFunctionName(name) {
          if (name === void 0) {
            return "_unknown";
          }
          name = name.replace(/[^a-zA-Z0-9_]/g, "$");
          var f = name.charCodeAt(0);
          if (f >= char_0 && f <= char_9) {
            return "_" + name;
          }
          return name;
        }