function getChange(current, last) {
        return _.pipe(
            _.map((c) =>
                _.assign({
                    change: c.count - findByName(last, c.name).count,
                })(c)
            ),
            _.take(50)
        )(current)
    }