function* getPublic(req, res, next) {
        let publicOptions = yield call(configurationManager.getConfigurations, true)
        yield call([res, "json"], publicOptions);
    }