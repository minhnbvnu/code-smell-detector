function isDefaultSetting(handler, property) {
        return handler[property] === $.mockjaxSettings[property];
    }