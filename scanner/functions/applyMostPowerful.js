function applyMostPowerful(state) {
      var context = state.cmdState;
      for (var i = context.length - 1; i >= 0; i--) {
	  var plug = context[i];
	  if (plug.name=="DEFAULT")
	      continue;
	  return plug.styleIdentifier();
      }
      return null;
    }