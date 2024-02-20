function generateRuleDoc(rule) {
  const isDefault = !rule.meta.deprecated && rule.meta.isDefault
  const isRecommended = !rule.meta.deprecated && rule.meta.recommended
  const isDeprecated = rule.meta.deprecated
  const version = GitHelper.getFirstVersionOfFile(rule.file)
  const defaultSeverity = getDefaultSeverity(rule)

  return `---
warning:     "This is a dynamically generated file. Do not edit manually."
layout:      "default"
title:       "${rule.ruleId} | Solhint"
---

# ${rule.ruleId}
${[
  recommendedBadge(isRecommended),
  deprecatedBadge(isDeprecated),
  categoryBadge(rule.meta.docs.category),
  defaultSeverityBadge(defaultSeverity),
  isDefault
    ? '> The {"extends": "solhint:default"} property in a configuration file enables this rule.\n'
    : '',
  isRecommended
    ? '> The {"extends": "solhint:recommended"} property in a configuration file enables this rule.\n'
    : '',
  isDeprecated ? '> This rule is **deprecated**\n' : '',
]
  .filter((s) => s !== '')
  .join('\n')}

## Description
${rule.meta.docs.description}

## Options
${loadOptions(rule)}

### Example Config
${loadExampleConfig(rule)}
${loadNotes(rule)}
## Examples
${loadExamples(rule)}

## Version
${linkToVersion(version)}

## Resources
- [Rule source](${linkToSource(rule)})
- [Document source](${linkToDocumentSource(rule)})
- [Test cases](${linkToTestCase(rule)})
`
}