function renderCategory(category) {
    return `### ${category.id}

| Rule ID | Description |    |
|:--------|:------------|:--:|
${category.rules.map(renderRule).join("\n")}
`
}