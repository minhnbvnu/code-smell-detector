function NormalizerRule(json) {
  if (!json) {
    logger.debug('Received incompletely specified metric normalization rule from collector.')
    json = Object.create(null)
  }

  this.eachSegment = json.each_segment || false
  this.precedence = json.eval_order || 0
  this.isTerminal = json.terminate_chain || false
  this.replacement = replaceReplacer(json.replacement || '$0')
  this.replaceAll = json.replace_all || false
  this.ignore = json.ignore || false
  this.matched = false

  let modifiers = 'i'
  if (this.replaceAll) {
    modifiers += 'g'
  }

  // don't allow this to fail
  if (json.match_expression instanceof RegExp) {
    this.pattern = _addRegExpFlags(json.match_expression, modifiers)
  } else {
    try {
      this.pattern = new RegExp(json.match_expression || '^$', modifiers)
    } catch (error) {
      logger.warn(error, 'Problem compiling metric normalization rule pattern.')
      this.pattern = /^$/
    }
  }
}