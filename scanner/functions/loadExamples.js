function loadExamples(rule) {
  if (!rule.meta.docs.examples) {
    return 'This rule does not have examples.'
  }

  const examples = [loadCorrectExample(rule), loadIncorrectExample(rule)]
    .filter((s) => s !== '')
    .join('\n\n')
  return examples === '' ? 'This rule does not have examples.' : examples
}