async function checkRules(codeDir, rules) {
  const andRules = rules.and;
  if (andRules) {
    const checkResultPromises = _.map(andRules, (rule) => {
      return checkRule(codeDir, rule);
    });

    const everyResults = await Promise.all(checkResultPromises);

    const match = _.every(everyResults, (r) => r);
    return match;
  }

  const orRules = rules.or;
  if (orRules) {
    const checkResultPromises = _.map(orRules, (rule) => {
      return checkRule(codeDir, rule);
    });

    const everyResults = await Promise.all(checkResultPromises);

    const match = _.some(everyResults, (r) => r);
    return match;
  }

  return false;
}