function DEFNODE(type, props, ctor, methods, base = AST_Node) {
            if (!props)
                props = [];
            else
                props = props.split(/\s+/);
            var self_props = props;
            if (base && base.PROPS)
                props = props.concat(base.PROPS);
            const proto = base && Object.create(base.prototype);
            if (proto) {
                ctor.prototype = proto;
                ctor.BASE = base;
            }
            if (base)
                base.SUBCLASSES.push(ctor);
            ctor.prototype.CTOR = ctor;
            ctor.prototype.constructor = ctor;
            ctor.PROPS = props || null;
            ctor.SELF_PROPS = self_props;
            ctor.SUBCLASSES = [];
            if (type) {
                ctor.prototype.TYPE = ctor.TYPE = type;
            }
            if (methods)
                for (let i in methods)
                    if (HOP(methods, i)) {
                        if (i[0] === "$") {
                            ctor[i.substr(1)] = methods[i];
                        }
                        else {
                            ctor.prototype[i] = methods[i];
                        }
                    }
            ctor.DEFMETHOD = function (name, method) {
                this.prototype[name] = method;
            };
            return ctor;
        }