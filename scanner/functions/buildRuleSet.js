function buildRuleSet(rules, context) {
  const length = rules.length;

  /**
   * @type {Array<CompiledRule>}
   */
  const compiledRules = new Array(length);

  for (let i = 0; i < length; ++i) {
    const rule = rules[i];
    const filter =
      'filter' in rule
        ? buildExpression(rule.filter, BooleanType, context)
        : always;

    /**
     * @type {Array<StyleEvaluator>}
     */
    let styles;
    if (Array.isArray(rule.style)) {
      const styleLength = rule.style.length;
      styles = new Array(styleLength);
      for (let j = 0; j < styleLength; ++j) {
        styles[j] = buildStyle(rule.style[j], context);
      }
    } else {
      styles = [buildStyle(rule.style, context)];
    }

    compiledRules[i] = {filter, styles};
  }

  return function (context) {
    /**
     * @type {Array<Style>}
     */
    const styles = [];

    let someMatched = false;
    for (let i = 0; i < length; ++i) {
      const filterEvaluator = compiledRules[i].filter;
      if (!filterEvaluator(context)) {
        continue;
      }
      if (rules[i].else && someMatched) {
        continue;
      }
      someMatched = true;
      for (const styleEvaluator of compiledRules[i].styles) {
        const style = styleEvaluator(context);
        if (!style) {
          continue;
        }
        styles.push(style);
      }
    }

    return styles;
  };
}