function getConstantViolationsBefore(binding, path, functions) {
  const violations = binding.constantViolations.slice();
  violations.unshift(binding.path);
  return violations.filter(violation => {
    violation = violation.resolve();

    const status = violation._guessExecutionStatusRelativeTo(path);

    if (functions && status === "unknown") functions.push(violation);
    return status === "before";
  });
}