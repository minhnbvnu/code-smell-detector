function _extender(obj) {
                var ret = obj, i, l;
                if (!(obj instanceof Base)) {
                    var OurBase = Base;
                    for (i = 0, l = defined.length; i < l; i++) {
                        var definer = defined[i];
                        if (definer[0](obj)) {
                            OurBase = OurBase.extend({instance: definer[1]});
                        }
                    }
                    ret = new OurBase(obj);
                    ret["__extender__"] = _extender;
                }
                return ret;
            }