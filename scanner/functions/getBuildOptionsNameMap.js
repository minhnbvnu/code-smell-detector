function getBuildOptionsNameMap() {
            return buildOptionsNameMapCache || (buildOptionsNameMapCache = createOptionNameMap(buildOpts));
        }