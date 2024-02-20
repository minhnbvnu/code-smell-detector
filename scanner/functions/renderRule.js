function renderRule(rule) {
    const mark = `${rule.recommended ? "⭐️" : ""}${rule.fixable ? "✒️" : ""}`
    const link = `[${rule.id}](./docs/rules/${rule.name}.md)`
    const description = rule.description || "(no description)"
    return `| ${link} | ${description} | ${mark} |`
}