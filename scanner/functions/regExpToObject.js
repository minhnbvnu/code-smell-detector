function regExpToObject(re) {
    var string = String(re),
        start = string.indexOf('/'),
        flagStart = string.lastIndexOf('/');
    return {
        expression: string.slice(start+1, flagStart),
        flags: string.slice(flagStart+1)
    };
}