function checkDuplicatedValue() {
      const value = findProp(node, "value");
      if (value) {
        context.onError(
          createDOMCompilerError(
            60,
            value.loc
          )
        );
      }
    }