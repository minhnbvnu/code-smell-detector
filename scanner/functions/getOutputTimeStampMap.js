function getOutputTimeStampMap(state, resolvedConfigFilePath) {
            if (!state.watch)
                return void 0;
            let result = state.outputTimeStamps.get(resolvedConfigFilePath);
            if (!result)
                state.outputTimeStamps.set(resolvedConfigFilePath, result = /* @__PURE__ */ new Map());
            return result;
        }