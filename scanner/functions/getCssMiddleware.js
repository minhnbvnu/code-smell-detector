function* getCssMiddleware(req, res, next){
        let css = yield call(configurationManager.getConfiguration, "extra_css");
        res.set('Content-Type', 'text/css');
        yield call([res, "send"], css.value);
    }