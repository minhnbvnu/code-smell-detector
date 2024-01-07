function computeOperatorFunctionName(operator, context) {
  return `operator_${operator}_${Object.keys(context.functions).length}`;
}