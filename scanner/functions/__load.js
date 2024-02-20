function __load(flow, name) {
        var arr = data[name],
            i = -1,
            l = arr.length,
            ret = [],
            obj;
        while (++i < l) {
            obj = arr[i];
            var Cls = flow.getDefined(obj.type.trim());
            ret.push(new Cls(obj.props));
        }
        return ret;
    }