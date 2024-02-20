function getRenameAction(context, { name, jsDocHost, signature, jsDocParameterTag }) {
            if (!length(signature.parameters))
                return void 0;
            const sourceFile = context.sourceFile;
            const tags = getJSDocTags(signature);
            const names = /* @__PURE__ */ new Set();
            for (const tag of tags) {
                if (isJSDocParameterTag(tag) && isIdentifier(tag.name)) {
                    names.add(tag.name.escapedText);
                }
            }
            const parameterName = firstDefined(signature.parameters, (p) => isIdentifier(p.name) && !names.has(p.name.escapedText) ? p.name.getText(sourceFile) : void 0);
            if (parameterName === void 0)
                return void 0;
            const newJSDocParameterTag = factory.updateJSDocParameterTag(jsDocParameterTag, jsDocParameterTag.tagName, factory.createIdentifier(parameterName), jsDocParameterTag.isBracketed, jsDocParameterTag.typeExpression, jsDocParameterTag.isNameFirst, jsDocParameterTag.comment);
            const changes = ts_textChanges_exports.ChangeTracker.with(context, (changeTracker) => changeTracker.replaceJSDocComment(sourceFile, jsDocHost, map(tags, (t) => t === jsDocParameterTag ? newJSDocParameterTag : t)));
            return createCodeFixActionWithoutFixAll(renameUnmatchedParameter, changes, [Diagnostics.Rename_param_tag_name_0_to_1, name.getText(sourceFile), parameterName]);
        }