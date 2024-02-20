function rulesheet(callback) {
  return function (element) {
    if (!element.root) if (element = element.return) callback(element);
  };
}