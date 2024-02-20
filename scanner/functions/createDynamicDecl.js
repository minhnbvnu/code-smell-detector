function createDynamicDecl(dyn, append) {
            var type = dyn.type;
            if (type === DYN_FUNC$1) {
                var numArgs = dyn.data.length;
                return new Declaration(true, numArgs >= 1, numArgs >= 2, append);
            }
            else if (type === DYN_THUNK) {
                var data = dyn.data;
                return new Declaration(data.thisDep, data.contextDep, data.propDep, append);
            }
            else if (type === DYN_CONSTANT$1) {
                return new Declaration(false, false, false, append);
            }
            else if (type === DYN_ARRAY$1) {
                var thisDep = false;
                var contextDep = false;
                var propDep = false;
                for (var i = 0; i < dyn.data.length; ++i) {
                    var subDyn = dyn.data[i];
                    if (subDyn.type === DYN_PROP$1) {
                        propDep = true;
                    }
                    else if (subDyn.type === DYN_CONTEXT$1) {
                        contextDep = true;
                    }
                    else if (subDyn.type === DYN_STATE$1) {
                        thisDep = true;
                    }
                    else if (subDyn.type === DYN_FUNC$1) {
                        thisDep = true;
                        var subArgs = subDyn.data;
                        if (subArgs >= 1) {
                            contextDep = true;
                        }
                        if (subArgs >= 2) {
                            propDep = true;
                        }
                    }
                    else if (subDyn.type === DYN_THUNK) {
                        thisDep = thisDep || subDyn.data.thisDep;
                        contextDep = contextDep || subDyn.data.contextDep;
                        propDep = propDep || subDyn.data.propDep;
                    }
                }
                return new Declaration(thisDep, contextDep, propDep, append);
            }
            else {
                return new Declaration(type === DYN_STATE$1, type === DYN_CONTEXT$1, type === DYN_PROP$1, append);
            }
        }