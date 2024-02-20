function getProps(val) {
    return extd(val).map(function mapper(val) {
        return isArray(val) ? isArray(val[0]) ? getProps(val).value() : val.reverse().join(".") : val;
    }).flatten().filter(function (v) {
        return !!v;
    });
}