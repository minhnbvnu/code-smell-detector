function _touchList() {
        var list = [];
        Array.prototype.push.apply(list, arguments);
        list.item =  function(index) { return this[index]; };
        return list;
    }