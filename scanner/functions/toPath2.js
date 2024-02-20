function toPath2(state, fileName) {
            return toPath(fileName, state.compilerHost.getCurrentDirectory(), state.compilerHost.getCanonicalFileName);
        }