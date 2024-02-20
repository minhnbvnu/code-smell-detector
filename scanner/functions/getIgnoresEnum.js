function getIgnoresEnum() {
    return Object.keys(
        OPTIONS.reduce((retv, key) => {
            for (const alias of FEATURES[key].alias) {
                retv[alias] = true
            }
            retv[key] = true
            return retv
        }, Object.create(null))
    )
}