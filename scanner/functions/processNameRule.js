function processNameRule(rule, ctx) {
  if (!rule.pattern) {
    return logger.error({ rule: rule }, 'Simple naming rules require a pattern.')
  }
  if (!rule.name) {
    return logger.error({ rule: rule }, 'Simple naming rules require a replacement name.')
  }

  const precedence = rule.precedence
  const terminal = rule.terminate_chain
  const json = {
    match_expression: rule.pattern,
    eval_order: typeof precedence === 'number' ? precedence : 500,
    terminate_chain: typeof terminal === 'boolean' ? terminal : true,
    replace_all: rule.replace_all,
    replacement: rule.name,
    ignore: false
  }

  // Find where the rule should be inserted and do so.
  const reverse = ctx.config.feature_flag.reverse_naming_rules
  const insert = ctx.rules.findIndex(function findRule(r) {
    return reverse ? r.precedence >= json.eval_order : r.precedence > json.eval_order
  })
  if (insert === -1) {
    ctx.rules.push(new NormalizerRule(json))
  } else {
    ctx.rules.splice(insert, 0, new NormalizerRule(json))
  }
}