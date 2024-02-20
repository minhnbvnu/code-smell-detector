function renderDeprecatedRule(rule) {
    const link = `[${rule.id}](./docs/rules/${rule.name}.md)`
    const replacedBy = rule.replacedBy
        .map(nameRaw => {
            const name = nameRaw.replace(/^node[/]/u, "")
            return `[node/${name}](./docs/rules/${name}.md)`
        })
        .join(" and ")

    return `| ${link} | ${replacedBy || "(nothing)"} |`
}