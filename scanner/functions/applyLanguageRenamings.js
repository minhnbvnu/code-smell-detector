function applyLanguageRenamings(data) {
        const rename = (name) => {
            const r = _.find((o) => _.includes(name, o.before))(RenameLanguages)
            return r ? r.after : name
        }
        return _.map(_.update("name")(rename))(data)
    }