function nameParts(name) {
    var regSlash = /\s?[\/\\]+\s?/;
    return name.trim().split(regSlash).filter(function(item) {
        return item != "";
    });
}