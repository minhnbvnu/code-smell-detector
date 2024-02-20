function* getPluginOptions(publicOnly=false, valueOnly=false){

    //todo: 🚨🚨🚨🚨 pluginbot needs consume current - this is currently bad practice since it's not consuming services.
    let pluginOptions = yield select((state) => state.pluginbot.services.pluginOption)
    let optionEffecs = {};
    for(let option of pluginOptions || []){
        if(!publicOnly || option.visible) {
            optionEffecs[option.name] = call(function* () {
                let value = yield call([option, "getOption"]);
                return valueOnly ? value : {...option.data, value, plugin : true}
            })
        }
    }
    return yield all(optionEffecs);
}