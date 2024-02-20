function findByName(data, name) {
        return _.pipe(_.filter({ name: name }), _.first, _.omitBy(_.isNil))(data)
    }