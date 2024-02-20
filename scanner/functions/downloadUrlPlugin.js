function downloadUrlPlugin(toolbox) {
            var fn = toolbox.fn;
            var actions = {
                download: function download(url) {
                    return function(_ref) {
                        var errActions = _ref.errActions,
                            specSelectors = _ref.specSelectors,
                            specActions = _ref.specActions,
                            getConfigs = _ref.getConfigs;
                        var fetch = fn.fetch;
                        var config = getConfigs();
                        url = url || specSelectors.url();
                        specActions.updateLoadingStatus("loading");
                        errActions.clear({
                            source: "fetch"
                        });
                        fetch({
                            url: url,
                            loadSpec: true,
                            requestInterceptor: config.requestInterceptor || function(a) {
                                return a
                            },
                            responseInterceptor: config.responseInterceptor || function(a) {
                                return a
                            },
                            credentials: "same-origin",
                            headers: {
                                Accept: "application/json,*/*"
                            }
                        }).then(next, next);

                        function next(res) {
                            if (res instanceof Error || res.status >= 400) {
                                specActions.updateLoadingStatus("failed");
                                errActions.newThrownErr((0, _assign2.default)(new Error((res.message || res.statusText) + " " + url), {
                                    source: "fetch"
                                }));
                                if (!res.status && res instanceof Error) checkPossibleFailReasons();
                                return
                            }
                            specActions.updateLoadingStatus("success");
                            specActions.updateSpec(res.text);
                            if (specSelectors.url() !== url) {
                                specActions.updateUrl(url)
                            }
                        }

                        function checkPossibleFailReasons() {
                            try {
                                var specUrl = void 0;
                                if ("URL" in _window2.default) {
                                    specUrl = new URL(url)
                                } else {
                                    specUrl = document.createElement("a");
                                    specUrl.href = url
                                }
                                if (specUrl.protocol !== "https:" && _window2.default.location.protocol === "https:") {
                                    var error = (0, _assign2.default)(new Error("Possible mixed-content issue? The page was loaded over https:// but a " + specUrl.protocol + "// URL was specified. Check that you are not attempting to load mixed content."), {
                                        source: "fetch"
                                    });
                                    errActions.newThrownErr(error);
                                    return
                                }
                                if (specUrl.origin !== _window2.default.location.origin) {
                                    var _error = (0, _assign2.default)(new Error("Possible cross-origin (CORS) issue? The URL origin (" + specUrl.origin + ") does not match the page (" + _window2.default.location.origin + "). Check the server returns the correct 'Access-Control-Allow-*' headers."), {
                                        source: "fetch"
                                    });
                                    errActions.newThrownErr(_error)
                                }
                            } catch (e) {
                                return
                            }
                        }
                    }
                },
                updateLoadingStatus: function updateLoadingStatus(status) {
                    var enums = [null, "loading", "failed", "success", "failedConfig"];
                    if (enums.indexOf(status) === -1) {
                        console.error("Error: " + status + " is not one of " + (0, _stringify2.default)(enums))
                    }
                    return {
                        type: "spec_update_loading_status",
                        payload: status
                    }
                }
            };
            var reducers = {
                spec_update_loading_status: function spec_update_loading_status(state, action) {
                    return typeof action.payload === "string" ? state.set("loadingStatus", action.payload) : state
                }
            };
            var selectors = {
                loadingStatus: (0, _reselect.createSelector)(function(state) {
                    return state || (0, _immutable.Map)()
                }, function(spec) {
                    return spec.get("loadingStatus") || null
                })
            };
            return {
                statePlugins: {
                    spec: {
                        actions: actions,
                        reducers: reducers,
                        selectors: selectors
                    }
                }
            }
        }