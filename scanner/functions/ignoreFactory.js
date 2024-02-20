function ignoreFactory (ignoreList) {

    if (typeof ignoreList === 'function') {
        return ignoreList;
    }

    var fn = ignore().add(ignoreList || []);

    // @param   {String}
    // @return  {Boolean}
    return ignoreList.length ? function (src) {

        if (!src) {
            return false;
        }

        return !fn.filter([src])[0];

    } : function () {
        return false;
    };
}