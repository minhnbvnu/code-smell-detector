function perfGoal(name, targetDuration, method, arg=undefined, cleanup=undefined) {
    //noinspection JSUnusedGlobalSymbols
    _knownPerfTests.push({name, method: () => {
        let dt = _measureDuration(method, arg, targetDuration.duration_nanos);
        if (cleanup !== undefined) {
            cleanup(arg);
        }
        let p = dt.duration_nanos / targetDuration.duration_nanos;
        let pass = dt.duration_nanos <= targetDuration.duration_nanos;
        let info = `${_proportionDesc(p)} of goal [${_pad(targetDuration.description, 6)}] for ${name}`;
        if (pass) {
            console.log(info);
        } else {
            console.warn(info);
        }
        return {pass, info}
    }});
}