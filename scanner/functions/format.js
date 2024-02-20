function format(obj) {
    var browsers = {};
    obj.forEach(function(info) {
        var name = info.api_name;

        var browser = browsers[name] = browsers[name] || [];
        browser.push({
            name: name,
            version: info.short_version,
            platform: info.os,
        });
    });

    return browsers;
}