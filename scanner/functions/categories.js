function categories() {
        return _.drop(
            1,
            _.flatten(
                _.map(
                    (year) =>
                        _.map(
                            (quarter) => (quarter === 1 ? year.toString() : ""),
                            _.range(1, 5)
                        ),
                    _.range(2012, 2050)
                )
            )
        )
    }