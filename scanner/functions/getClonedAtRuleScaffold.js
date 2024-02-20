function getClonedAtRuleScaffold(rule, root, clonedAtRuleMap) {
  const cacheHit = clonedAtRuleMap.find((mapping) => {
    if (mapping.original === rule) {
      return mapping.clone;
    } else {
      return false;
    }
  });

  if (cacheHit) {
    return cacheHit.clone;
  }

  const clonedRule = rule.clone();

  clonedRule.removeAll();

  clonedAtRuleMap.push({
    original: rule,
    clone: clonedRule,
  });

  if (rule.parent.type === 'atrule') {
    const parentRule = getClonedAtRuleScaffold(
      rule.parent,
      root,
      clonedAtRuleMap
    );

    clonedRule.parent = parentRule;

    parentRule.nodes.push(clonedRule);
  } else {
    clonedRule.parent = root;
    root.nodes.push(clonedRule);
  }

  return clonedRule;
}