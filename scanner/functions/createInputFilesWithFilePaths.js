function createInputFilesWithFilePaths(readFileText, javascriptPath, javascriptMapPath, declarationPath, declarationMapPath, buildInfoPath, host, options) {
            const node = parseNodeFactory.createInputFiles();
            node.javascriptPath = javascriptPath;
            node.javascriptMapPath = javascriptMapPath;
            node.declarationPath = declarationPath;
            node.declarationMapPath = declarationMapPath;
            node.buildInfoPath = buildInfoPath;
            const cache = /* @__PURE__ */ new Map();
            const textGetter = (path) => {
                if (path === void 0)
                    return void 0;
                let value = cache.get(path);
                if (value === void 0) {
                    value = readFileText(path);
                    cache.set(path, value !== void 0 ? value : false);
                }
                return value !== false ? value : void 0;
            };
            const definedTextGetter = (path) => {
                const result = textGetter(path);
                return result !== void 0 ? result : `/* Input file ${path} was missing */\r
`;
            };
            let buildInfo;
            const getAndCacheBuildInfo = () => {
                var _a2, _b;
                if (buildInfo === void 0 && buildInfoPath) {
                    if (host == null ? void 0 : host.getBuildInfo) {
                        buildInfo = (_a2 = host.getBuildInfo(buildInfoPath, options.configFilePath)) != null ? _a2 : false;
                    }
                    else {
                        const result = textGetter(buildInfoPath);
                        buildInfo = result !== void 0 ? (_b = getBuildInfo(buildInfoPath, result)) != null ? _b : false : false;
                    }
                }
                return buildInfo || void 0;
            };
            Object.defineProperties(node, {
                javascriptText: { get: () => definedTextGetter(javascriptPath) },
                javascriptMapText: { get: () => textGetter(javascriptMapPath) },
                // TODO:: if there is inline sourceMap in jsFile, use that
                declarationText: { get: () => definedTextGetter(Debug.checkDefined(declarationPath)) },
                declarationMapText: { get: () => textGetter(declarationMapPath) },
                // TODO:: if there is inline sourceMap in dtsFile, use that
                buildInfo: { get: getAndCacheBuildInfo }
            });
            return node;
        }