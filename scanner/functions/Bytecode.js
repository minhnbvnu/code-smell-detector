function Bytecode(proto) {
    for (var key in proto) {
        if (proto.hasOwnProperty(key))
            this[key] = proto[key];
    }
}