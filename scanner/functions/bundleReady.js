function bundleReady(path) {
                var bundle,
                    token;

                path = path || localeConf.langFile;
                token = path + "._LOOKUP_";

                bundle = getBundle(token);

                if (!deferrences[path]) {
                    deferrences[path] = $q.defer();
                }

                if (bundle && !bundle._loading) {
                    deferrences[path].resolve(path);
                } else {
                    if (!bundle) {
                        loadBundle(token);
                    }
                }

                return deferrences[path].promise;
            }