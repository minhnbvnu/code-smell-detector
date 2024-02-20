function typeParameterToName(type, context) {
                    var _a2, _b;
                    if (context.flags & 4 /* GenerateNamesForShadowedTypeParams */ && context.typeParameterNames) {
                        const cached = context.typeParameterNames.get(getTypeId(type));
                        if (cached) {
                            return cached;
                        }
                    }
                    let result = symbolToName(type.symbol, context, 788968 /* Type */, 
                    /*expectsIdentifier*/
                    true);
                    if (!(result.kind & 79 /* Identifier */)) {
                        return factory.createIdentifier("(Missing type parameter)");
                    }
                    if (context.flags & 4 /* GenerateNamesForShadowedTypeParams */) {
                        const rawtext = result.escapedText;
                        let i = ((_a2 = context.typeParameterNamesByTextNextNameCount) == null ? void 0 : _a2.get(rawtext)) || 0;
                        let text = rawtext;
                        while (((_b = context.typeParameterNamesByText) == null ? void 0 : _b.has(text)) || typeParameterShadowsNameInScope(text, context, type)) {
                            i++;
                            text = `${rawtext}_${i}`;
                        }
                        if (text !== rawtext) {
                            const typeArguments = getIdentifierTypeArguments(result);
                            result = factory.createIdentifier(text);
                            setIdentifierTypeArguments(result, typeArguments);
                        }
                        (context.typeParameterNamesByTextNextNameCount || (context.typeParameterNamesByTextNextNameCount = /* @__PURE__ */ new Map())).set(rawtext, i);
                        (context.typeParameterNames || (context.typeParameterNames = /* @__PURE__ */ new Map())).set(getTypeId(type), result);
                        (context.typeParameterNamesByText || (context.typeParameterNamesByText = /* @__PURE__ */ new Set())).add(rawtext);
                    }
                    return result;
                }