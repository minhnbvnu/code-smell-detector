function tryThis(str, feature, generateOnly) {
    if (!generateOnly) {
        try {
            eval(str);
        } catch (ex) {
            console.error(
                'ES6 feature [' +
                    feature +
                    '] is not available in this environment'
            );
            return false;
        }
    }
    return true;
}