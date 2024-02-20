function filterNonProgrammingLanguages(data) {
        return _.reject((o) => _.includes(o.name)(NoLanguages))(data)
    }