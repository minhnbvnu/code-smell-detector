function discriminateContextualTypeByJSXAttributes(node, contextualType) {
                return discriminateTypeByDiscriminableItems(contextualType, concatenate(map(filter(node.properties, (p) => !!p.symbol && p.kind === 288 /* JsxAttribute */ && isDiscriminantProperty(contextualType, p.symbol.escapedName) && (!p.initializer || isPossiblyDiscriminantValue(p.initializer))), (prop) => [!prop.initializer ? () => trueType : () => getContextFreeTypeOfExpression(prop.initializer), prop.symbol.escapedName]), map(filter(getPropertiesOfType(contextualType), (s) => {
                    var _a2;
                    return !!(s.flags & 16777216 /* Optional */) && !!((_a2 = node == null ? void 0 : node.symbol) == null ? void 0 : _a2.members) && !node.symbol.members.has(s.escapedName) && isDiscriminantProperty(contextualType, s.escapedName);
                }), (s) => [() => undefinedType, s.escapedName])), isTypeAssignableTo, contextualType);
            }