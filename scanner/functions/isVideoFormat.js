function isVideoFormat(file) {
    if ('type' in file) {
        return file.type.indexOf('video') > -1;
    }
    var urlSplt = file.split('.');
    var format = urlSplt[urlSplt.length-1];
    return !!format.match(/mov|mp4|avi|webm/);    
}