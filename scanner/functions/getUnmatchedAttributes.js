function getUnmatchedAttributes(checker, target, source) {
            const attrsType = checker.getContextualType(source.attributes);
            if (attrsType === void 0)
                return emptyArray;
            const targetProps = attrsType.getProperties();
            if (!length(targetProps))
                return emptyArray;
            const seenNames = /* @__PURE__ */ new Set();
            for (const sourceProp of source.attributes.properties) {
                if (isJsxAttribute(sourceProp)) {
                    seenNames.add(sourceProp.name.escapedText);
                }
                if (isJsxSpreadAttribute(sourceProp)) {
                    const type = checker.getTypeAtLocation(sourceProp.expression);
                    for (const prop of type.getProperties()) {
                        seenNames.add(prop.escapedName);
                    }
                }
            }
            return filter(targetProps, (targetProp) => isIdentifierText(targetProp.name, target, 1 /* JSX */) && !(targetProp.flags & 16777216 /* Optional */ || getCheckFlags(targetProp) & 48 /* Partial */ || seenNames.has(targetProp.escapedName)));
        }