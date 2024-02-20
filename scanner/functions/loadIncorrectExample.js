function loadIncorrectExample(rule) {
  if (rule.meta.docs.examples.bad && rule.meta.docs.examples.bad.length) {
    return `### 👎 Examples of **incorrect** code for this rule

${rule.meta.docs.examples.bad
  .map((ex) => `#### ${ex.description}\n\n\`\`\`solidity\n${ex.code}\n\`\`\``)
  .join('\n\n')}`
  } else {
    return ''
  }
}