function ignores(keyword) {
    return original => {
        const pattern = Object.assign({}, original)
        delete pattern.error

        pattern.options = pattern.options.slice()
        pattern.options[0] = Object.assign({}, pattern.options[0])
        if (pattern.options[0].ignores) {
            pattern.options[0].ignores = pattern.options[0].ignores.concat([
                keyword,
            ])
        } else {
            pattern.options[0].ignores = [keyword]
        }

        return pattern
    }
}