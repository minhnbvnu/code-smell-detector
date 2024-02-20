function getJSDocParameterTagsWorker(param, noCache) {
            if (param.name) {
                if (isIdentifier(param.name)) {
                    const name = param.name.escapedText;
                    return getJSDocTagsWorker(param.parent, noCache).filter((tag) => isJSDocParameterTag(tag) && isIdentifier(tag.name) && tag.name.escapedText === name);
                }
                else {
                    const i = param.parent.parameters.indexOf(param);
                    Debug.assert(i > -1, "Parameters should always be in their parents' parameter list");
                    const paramTags = getJSDocTagsWorker(param.parent, noCache).filter(isJSDocParameterTag);
                    if (i < paramTags.length) {
                        return [paramTags[i]];
                    }
                }
            }
            return emptyArray;
        }