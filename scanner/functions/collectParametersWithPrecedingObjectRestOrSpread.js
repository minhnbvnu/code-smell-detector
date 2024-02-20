function collectParametersWithPrecedingObjectRestOrSpread(node) {
                let parameters;
                for (const parameter of node.parameters) {
                    if (parameters) {
                        parameters.add(parameter);
                    }
                    else if (parameter.transformFlags & 65536 /* ContainsObjectRestOrSpread */) {
                        parameters = /* @__PURE__ */ new Set();
                    }
                }
                return parameters;
            }