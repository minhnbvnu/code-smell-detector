function getExtended() {

            var loaded = {};


            //getInitial instance;
            var extended = extender.define();
            extended.expose({
                register: function register(alias, extendWith) {
                    if (!extendWith) {
                        extendWith = alias;
                        alias = null;
                    }
                    var type = typeof extendWith;
                    if (alias) {
                        extended[alias] = extendWith;
                    } else if (extendWith && type === "function") {
                        extended.extend(extendWith);
                    } else if (type === "object") {
                        extended.expose(extendWith);
                    } else {
                        throw new TypeError("extended.register must be called with an extender function");
                    }
                    return extended;
                },

                define: function () {
                    return extender.define.apply(extender, arguments);
                }
            });

            return extended;
        }