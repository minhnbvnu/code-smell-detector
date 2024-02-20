function relName(state, path) {
            return convertToRelativePath(path, state.compilerHost.getCurrentDirectory(), state.compilerHost.getCanonicalFileName);
        }