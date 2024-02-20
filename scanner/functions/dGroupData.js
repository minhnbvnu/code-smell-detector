function dGroupData(entries, cutAt) {
    var entrs = Object.entries(entries);
    entrs = entrs.sort((a, b) => b[1] - a[1]);
    var top = entrs.slice(0, cutAt);
    var bottom = entrs.slice(cutAt);

    otherVal = 0;
    bottom.forEach((el) => (otherVal += el[1]));
    if (otherVal) {
        top.push(["Other", otherVal]);
    }

    var res = Object.fromEntries(top);
    if ("Unknown" in res) {
        res["Other"] = (res["Other"] || 0) + res["Unknown"];
        delete res["Unknown"];
    }
    return res;
}