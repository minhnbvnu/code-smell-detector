function resolveComponents(base, relative) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var skipNormalization = arguments[3];
            var target = {};
            if (!skipNormalization) {
                base = parse(serialize(base, options), options); //normalize base components
                relative = parse(serialize(relative, options), options); //normalize relative components
            }
            options = options || {};
            if (!options.tolerant && relative.scheme) {
                target.scheme = relative.scheme;
                //target.authority = relative.authority;
                target.userinfo = relative.userinfo;
                target.host = relative.host;
                target.port = relative.port;
                target.path = removeDotSegments(relative.path || "");
                target.query = relative.query;
            }
            else {
                if (relative.userinfo !== undefined || relative.host !== undefined || relative.port !== undefined) {
                    //target.authority = relative.authority;
                    target.userinfo = relative.userinfo;
                    target.host = relative.host;
                    target.port = relative.port;
                    target.path = removeDotSegments(relative.path || "");
                    target.query = relative.query;
                }
                else {
                    if (!relative.path) {
                        target.path = base.path;
                        if (relative.query !== undefined) {
                            target.query = relative.query;
                        }
                        else {
                            target.query = base.query;
                        }
                    }
                    else {
                        if (relative.path.charAt(0) === "/") {
                            target.path = removeDotSegments(relative.path);
                        }
                        else {
                            if ((base.userinfo !== undefined || base.host !== undefined || base.port !== undefined) && !base.path) {
                                target.path = "/" + relative.path;
                            }
                            else if (!base.path) {
                                target.path = relative.path;
                            }
                            else {
                                target.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative.path;
                            }
                            target.path = removeDotSegments(target.path);
                        }
                        target.query = relative.query;
                    }
                    //target.authority = base.authority;
                    target.userinfo = base.userinfo;
                    target.host = base.host;
                    target.port = base.port;
                }
                target.scheme = base.scheme;
            }
            target.fragment = relative.fragment;
            return target;
        }