function filterDate(data, year, quarter) {
        return _.pipe(
            _.filter({ year: year, quarter: quarter }),
            _.map(_.pick(["name", "count"]))
        )(data)
    }