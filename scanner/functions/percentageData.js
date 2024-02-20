function percentageData(data) {
        const total = _.pipe(_.map("count"), _.map(Number), _.sum)(data)
        return _.pipe(_.map(_.update("count")((d) => d / total)))(data)
    }