function getPathsBasePath(options, host) {
            var _a2, _b;
            if (!options.paths)
                return void 0;
            return (_b = options.baseUrl) != null ? _b : Debug.checkDefined(options.pathsBasePath || ((_a2 = host.getCurrentDirectory) == null ? void 0 : _a2.call(host)), "Encountered 'paths' without a 'baseUrl', config file, or host 'getCurrentDirectory'.");
        }