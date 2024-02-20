function getPushReply(name) {
    var r = JSON.parse(JSON.stringify(data.base));
    r.pushes.push(JSON.parse(JSON.stringify(data[name])))
    return r;
}