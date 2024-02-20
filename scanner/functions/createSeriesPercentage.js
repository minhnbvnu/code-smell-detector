function createSeriesPercentage(data, top) {
        return _.pipe(
            _.map(_.update("count")(Math.floor)),
            createSeries(top),
            percentageData
        )(data)
    }