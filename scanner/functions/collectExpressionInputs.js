function collectExpressionInputs(inputs, list) {
      for (var i = 0, ii = inputs.length; i < ii; i++) {
        var input = inputs[i];
        if (!input.constant) {
          if (input.inputs) {
            collectExpressionInputs(input.inputs, list);
          } else if (list.indexOf(input) === -1) { // TODO(perf) can we do better?
            list.push(input);
          }
        }
      }

      return list;
    }