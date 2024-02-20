function evalWrapper(str) {
          hit(source);
          logMessage(source, 'eval("'.concat(str, '")'), true);
          return nativeEval(str);
        }