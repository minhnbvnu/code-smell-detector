function updateSignatureOfFile(state, signature, path) {
                        state.fileInfos.get(path).signature = signature;
                        (state.hasCalledUpdateShapeSignature || (state.hasCalledUpdateShapeSignature = /* @__PURE__ */ new Set())).add(path);
                    }