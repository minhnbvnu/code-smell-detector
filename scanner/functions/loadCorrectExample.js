function loadCorrectExample(rule) {
  if (rule.meta.docs.examples.good && rule.meta.docs.examples.good.length) {
    return `### 👍 Examples of **correct** code for this rule

${rule.meta.docs.examples.good
  .map((ex) => `#### ${ex.description}\n\n\`\`\`solidity\n${ex.code}\n\`\`\``)
  .join('\n\n')}`
  } else {
    return ''
  }
}