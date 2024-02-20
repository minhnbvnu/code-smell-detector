function getRouteInfo(cooked){
    var info = [];
    _.each(cooked.comments, function(comment) {
        info.unshift(comment.text);
    });
    return info;
}