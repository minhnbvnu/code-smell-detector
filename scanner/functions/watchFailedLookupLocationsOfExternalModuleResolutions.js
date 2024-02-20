function watchFailedLookupLocationsOfExternalModuleResolutions(name, resolution, filePath, getResolutionWithResolvedFileName) {
                var _a2, _b;
                if (resolution.refCount) {
                    resolution.refCount++;
                    Debug.assertIsDefined(resolution.files);
                }
                else {
                    resolution.refCount = 1;
                    Debug.assert(!((_a2 = resolution.files) == null ? void 0 : _a2.size));
                    if (isExternalModuleNameRelative(name)) {
                        watchFailedLookupLocationOfResolution(resolution);
                    }
                    else {
                        nonRelativeExternalModuleResolutions.add(name, resolution);
                    }
                    const resolved = getResolutionWithResolvedFileName(resolution);
                    if (resolved && resolved.resolvedFileName) {
                        const key = resolutionHost.toPath(resolved.resolvedFileName);
                        let resolutions = resolvedFileToResolution.get(key);
                        if (!resolutions)
                            resolvedFileToResolution.set(key, resolutions = /* @__PURE__ */ new Set());
                        resolutions.add(resolution);
                    }
                }
                ((_b = resolution.files) != null ? _b : resolution.files = /* @__PURE__ */ new Set()).add(filePath);
            }