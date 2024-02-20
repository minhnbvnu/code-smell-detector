function pathToDescriptor(path, filterConfig) {
  if (filterConfig.edgeMode === "Off") {
    return "";
  }
  if (path.startsWith("$.Properties.Environment")) {
    return "Variable";
  }

  if (path.startsWith("$.Properties.Policies")) {
    const split = path.split(".");
    return split[3];
  }

  if (
    path.startsWith(
      "$.Properties.EventInvokeConfig.DestinationConfig.OnFailure"
    )
  ) {
    return "OnFailure";
  }

  if (
    path.startsWith(
      "$.Properties.EventInvokeConfig.DestinationConfig.OnSuccess"
    )
  ) {
    return "OnSuccess";
  }

  return path.split(".").slice(-1)[0];
}