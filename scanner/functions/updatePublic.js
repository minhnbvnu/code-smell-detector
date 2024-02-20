function* updatePublic(req, res, next){
        let updates = yield call(configurationManager.updateConfigurations, req.body, true);
        //todo: why is this so stupid
        let reduced = updates.reduce((settings, setting)=>{
            settings[setting[0].option] = setting[0].value;
            return settings;
        }, {});
        yield call([res, "json"], reduced);
        yield put(triggerEvent("system_options_updated", reduced));
    }