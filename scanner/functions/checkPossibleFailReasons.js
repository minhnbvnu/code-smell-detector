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