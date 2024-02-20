function defineProps(child, proto) {
            var operations = proto.setters,
                __setters = child.__setters__,
                __getters = child.__getters__;
            if (operations) {
                for (var i in operations) {
                    __setters[i] = operations[i];
                }
            }
            operations = proto.getters || {};
            if (operations) {
                for (i in operations) {
                    __getters[i] = operations[i];
                }
            }
            for (i in proto) {
                if (i != "getters" && i != "setters") {
                    var f = proto[i];
                    if ("function" === typeof f) {
                        var meta = f.__meta || {};
                        if (!meta.isConstructor) {
                            child[i] = functionWrapper(f, i);
                        } else {
                            child[i] = f;
                        }
                    } else {
                        child[i] = f;
                    }
                }
            }

        }