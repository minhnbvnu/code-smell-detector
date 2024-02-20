function loadExampleConfig(rule) {
  return `\`\`\`json
{
  "rules": {
    "${rule.ruleId}": ${JSON.stringify(rule.meta.defaultSetup)}
  }
}
\`\`\`
`
}