function filterUrl(url) {
    for (var i = 0; i < filterArray.length; i++) {
        if (url.indexOf(filterArray[i]) != -1) {
            // console.log(url + " ?? " + filterArray[i])
            return true;
        }
    }
    return false;
}