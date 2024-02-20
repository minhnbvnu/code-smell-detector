function loadBundle(token) {
                var path = token ? token.split('.') : '',
                    root = bundles,
                    url = localeConf.basePath + '/' + currentLocale,
                    i;

                if (path.length > 1) {
                    for (i = 0; i < path.length - 1; i++) {
                        if (!root[path[i]]) {
                            root[path[i]] = {};
                        }
                        root = root[path[i]];
                        url += "/" + path[i];
                    }

                    if (!root._loading) {
                        root._loading = true;

                        url += localeConf.fileExtension;

                        $http.get(url)
                            .success(function (data) {
                                var key,
                                    path = getPath(token);
                                // Merge the contents of the obtained data into the stored bundle.
                                for (key in data) {
                                    if (data.hasOwnProperty(key)) {
                                        root[key] = data[key];
                                    }
                                }

                                // Mark the bundle as having been "loaded".
                                delete root._loading;

                                // Notify anyone who cares to know about this event.
                                $rootScope.$broadcast(localeEvents.resourceUpdates);

                                // If we issued a Promise for this file, resolve it now.
                                if (deferrences[path]) {
                                    deferrences[path].resolve(path);
                                }
                            })
                            .error(function (data) {
                                $log.error("[localizationService] Failed to load: " + url);

                                // We can try it again later.
                                delete root._loading;
                            });
                    }
                }
            }