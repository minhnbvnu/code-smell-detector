function getJSDocParameterNameCompletions(tag) {
            if (!isIdentifier(tag.name)) {
                return emptyArray;
            }
            const nameThusFar = tag.name.text;
            const jsdoc = tag.parent;
            const fn = jsdoc.parent;
            if (!isFunctionLike(fn))
                return [];
            return mapDefined(fn.parameters, (param) => {
                if (!isIdentifier(param.name))
                    return void 0;
                const name = param.name.text;
                if (jsdoc.tags.some((t) => t !== tag && isJSDocParameterTag(t) && isIdentifier(t.name) && t.name.escapedText === name) || nameThusFar !== void 0 && !startsWith(name, nameThusFar)) {
                    return void 0;
                }
                return { name, kind: "parameter" /* parameterElement */, kindModifiers: "", sortText: ts_Completions_exports.SortText.LocationPriority };
            });
        }