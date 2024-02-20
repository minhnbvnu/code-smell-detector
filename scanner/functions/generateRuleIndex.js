function generateRuleIndex(rulesIndexed) {
  const contents = Object.keys(rulesIndexed)
    .map((category) => {
      const rows = [['Rule Id', 'Error', 'Recommended', 'Deprecated']]
      rulesIndexed[category]
        .map((rule) => [
          `[${rule.ruleId}](./rules/${rule.meta.type}/${rule.ruleId}.md)`,
          rule.meta.docs.description,
          rule.meta.recommended && !rule.meta.deprecated ? '$~~~~~~~~$✔️' : '',
          rule.meta.deprecated ? '$~~~~~~~$✔️' : '',
        ])
        .forEach((row) => rows.push(row))
      return `## ${category}

${table(rows)}
        `
    })
    .join('\n\n')

  return `---
warning:     "This is a dynamically generated file. Do not edit manually."
layout:      "default"
title:       "Rule Index of Solhint"
---

${contents}

## References

- [ConsenSys Guide for Smart Contracts](https://consensys.github.io/smart-contract-best-practices/recommendations/)
- [Solidity Style Guide](http://solidity.readthedocs.io/en/develop/style-guide.html)
`
}