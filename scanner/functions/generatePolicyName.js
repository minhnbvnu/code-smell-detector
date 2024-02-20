function generatePolicyName(action, ...resourceArr) {
  const resource = resourceArr && resourceArr.length ? resourceArr.join('-') : Math.random().toString(36).slice(-8);
  return `fun-generated-${action.replace(/:/g, '-')}-${resource}`;
}