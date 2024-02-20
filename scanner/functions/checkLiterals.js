function checkLiterals(literals, context) {
  const configs = findMenuConfigs(context.getFilename());
  for (let i = 0; i < literals.length; i++) {
    if (isCommandWhitelisted(literals[i].value)) {
      continue;
    }
    if (
      !configs.some(config => menuContainsCommand(config, literals[i].value))
    ) {
      context.report({
        node: literals[i],
        message: MISSING_MENU_ITEM_ERROR + ' (' + literals[i].value + ')',
      });
    }
  }
}