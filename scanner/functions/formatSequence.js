function formatSequence(state, nodes) {
    var generator = state.generator;

    state.write('(');
    if (nodes != null && nodes.length > 0) {
      generator[nodes[0].type](nodes[0], state);
      var length = nodes.length;

      for (var i = 1; i < length; i++) {
        var param = nodes[i];
        state.write(', ');
        generator[param.type](param, state);
      }
    }
    state.write(')');
  }