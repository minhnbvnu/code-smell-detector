function renderHeader(rule) {
    const lines = [`# ${rule.id}`, `> ${rule.description}`]

    if (rule.recommended) {
        lines.push(
            "> - ⭐️ This rule is included in `plugin:node/recommended` preset."
        )
    }
    if (rule.fixable) {
        lines.push(
            "> - ✒️ The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule."
        )
    }
    if (rule.deprecated) {
        const replace = rule.replacedBy.map(
            ruleId => `[${ruleId}](./${ruleId.replace("node/", "")}.md)`
        )
        const replaceText =
            replace.length === 0
                ? ""
                : ` Use ${listFormatter.format(replace)} instead.`
        lines.push(`> - ⛔ This rule has been deprecated.${replaceText}`)
    }
    lines.push("", "")

    return lines.join("\n")
}