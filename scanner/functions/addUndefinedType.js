function addUndefinedType(changeTracker, sourceFile, info) {
            const undefinedTypeNode = factory.createKeywordTypeNode(155 /* UndefinedKeyword */);
            const types = isUnionTypeNode(info.type) ? info.type.types.concat(undefinedTypeNode) : [info.type, undefinedTypeNode];
            const unionTypeNode = factory.createUnionTypeNode(types);
            if (info.isJs) {
                changeTracker.addJSDocTags(sourceFile, info.prop, [factory.createJSDocTypeTag(
                    /*tagName*/
                    void 0, factory.createJSDocTypeExpression(unionTypeNode))]);
            }
            else {
                changeTracker.replaceNode(sourceFile, info.type, unionTypeNode);
            }
        }