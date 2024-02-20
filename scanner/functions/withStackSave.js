function withStackSave(f) {
          var stack = stackSave();
          var ret = f();
          stackRestore(stack);
          return ret;
        }