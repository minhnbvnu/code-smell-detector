function fillZeros(data) {
        const HistSize = _.pipe(_.map("data"), _.map(_.size), _.max)(data)
        const fill = (d) => new Array(HistSize - _.size(d)).fill(0).concat(d)
        return _.map(_.update("data", fill))(data)
    }