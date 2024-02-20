function getDefaultTagNameForKind(kind) {
            switch (kind) {
                case 347 /* JSDocTypeTag */:
                    return "type";
                case 345 /* JSDocReturnTag */:
                    return "returns";
                case 346 /* JSDocThisTag */:
                    return "this";
                case 343 /* JSDocEnumTag */:
                    return "enum";
                case 333 /* JSDocAuthorTag */:
                    return "author";
                case 335 /* JSDocClassTag */:
                    return "class";
                case 336 /* JSDocPublicTag */:
                    return "public";
                case 337 /* JSDocPrivateTag */:
                    return "private";
                case 338 /* JSDocProtectedTag */:
                    return "protected";
                case 339 /* JSDocReadonlyTag */:
                    return "readonly";
                case 340 /* JSDocOverrideTag */:
                    return "override";
                case 348 /* JSDocTemplateTag */:
                    return "template";
                case 349 /* JSDocTypedefTag */:
                    return "typedef";
                case 344 /* JSDocParameterTag */:
                    return "param";
                case 351 /* JSDocPropertyTag */:
                    return "prop";
                case 341 /* JSDocCallbackTag */:
                    return "callback";
                case 342 /* JSDocOverloadTag */:
                    return "overload";
                case 331 /* JSDocAugmentsTag */:
                    return "augments";
                case 332 /* JSDocImplementsTag */:
                    return "implements";
                default:
                    return Debug.fail(`Unsupported kind: ${Debug.formatSyntaxKind(kind)}`);
            }
        }