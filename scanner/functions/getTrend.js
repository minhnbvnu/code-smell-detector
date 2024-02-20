function getTrend(current, last) {
        return _.pipe(
            _.map((c) =>
                _.assign({
                    trend: findByName(last, c.name).id - c.id,
                })(c)
            ),
            _.take(numberState)
        )(current)
    }