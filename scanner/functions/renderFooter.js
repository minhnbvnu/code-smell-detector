function renderFooter(rule) {
    const docsPath = path.dirname(path.resolve(docsRoot, `${rule.name}.md`))
    const rulePath = path
        .relative(docsPath, path.join(ruleRoot, `${rule.name}.js`))
        .replace(/\\/gu, "/")
    const testPath = path
        .relative(docsPath, path.join(testRoot, `${rule.name}.js`))
        .replace(/\\/gu, "/")

    return `\n\n## 🔎 Implementation\n\n- [Rule source](${rulePath})\n- [Test source](${testPath})`
}