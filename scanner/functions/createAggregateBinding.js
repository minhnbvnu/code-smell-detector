function createAggregateBinding(parts) {
  if (parts.length === 1) {
    return parts[0];
  }

  let targetName;
  const partCount = parts.length;
  const finalParts = parts.map(x => {
    if (typeof x === "string") {
      return () => x;
    }

    targetName = x.targetName || targetName;
    return x.binding;
  });

  const binding = (scope, context) => {
    let output = "";

    for (let i = 0; i < partCount; ++i) {
      output += finalParts[i](scope, context);
    }

    return output;
  };

  const directive = new HTMLBindingDirective(binding);
  directive.targetName = targetName;
  return directive;
}