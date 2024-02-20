function getMaxResponseLength(config, logEmitter) {
    if(config && config.maxResponseLength) {
        return config.maxResponseLength;
    }
    else {
        var max = 10000000; // default to 10,000,000
        logEmitter.emitWarning(JSON.stringify({
            message: 'config.maxResponseLength is undefined! Defaulting to ' + max
        }));
        return max;
    }
}