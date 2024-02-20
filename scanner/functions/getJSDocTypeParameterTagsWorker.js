function getJSDocTypeParameterTagsWorker(param, noCache) {
            const name = param.name.escapedText;
            return getJSDocTagsWorker(param.parent, noCache).filter((tag) => isJSDocTemplateTag(tag) && tag.typeParameters.some((tp) => tp.name.escapedText === name));
        }