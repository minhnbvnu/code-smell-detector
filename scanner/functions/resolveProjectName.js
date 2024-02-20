function resolveProjectName(state, name) {
            return resolveConfigFileProjectName(resolvePath(state.compilerHost.getCurrentDirectory(), name));
        }