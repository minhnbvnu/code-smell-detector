function getTypeRatio (css, opts) {
    // Start with the default ratio
    let typeRatio = opts.typeRatio

    // Walk over all the root selectors
    css.walkRules(opts.rootSelector, rule => {

        // Omit the process if the selector is inside a print media query
        if (rule.parent && rule.parent.params === 'print') return

        // Walk over all the font-size rules
        rule.walkDecls(opts.ratioProperty, decl => {
            typeRatio = parseFloat(decl.value)
        })
    })

    return typeRatio
}