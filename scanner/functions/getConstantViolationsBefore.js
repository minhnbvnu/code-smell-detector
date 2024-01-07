function getConstantViolationsBefore(binding, path, functions) {
	  var violations = binding.constantViolations.slice();
	  violations.unshift(binding.path);
	  return violations.filter(function (violation) {
	    violation = violation.resolve();
	    var status = violation._guessExecutionStatusRelativeTo(path);
	    if (functions && status === "function") functions.push(violation);
	    return status === "before";
	  });
	}