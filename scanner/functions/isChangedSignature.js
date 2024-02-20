function isChangedSignature(state, path) {
            const oldSignature = Debug.checkDefined(state.oldSignatures).get(path) || void 0;
            const newSignature = Debug.checkDefined(state.fileInfos.get(path)).signature;
            return newSignature !== oldSignature;
        }