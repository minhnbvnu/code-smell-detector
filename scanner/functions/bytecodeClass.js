function bytecodeClass(props) {
    var proto = new Bytecode(props);
    var constructor = proto.constructor;
    var wrapped = function(x) {
        if (!(this instanceof wrapped))
            return new wrapped(x);
        constructor.call(this, x);
    };
    proto.constructor = wrapped;
    wrapped.prototype = proto;
    return wrapped;
}