function tryMergeJsdocTags(oldTag, newTag) {
            if (oldTag.kind !== newTag.kind) {
                return void 0;
            }
            switch (oldTag.kind) {
                case 344 /* JSDocParameterTag */: {
                    const oldParam = oldTag;
                    const newParam = newTag;
                    return isIdentifier(oldParam.name) && isIdentifier(newParam.name) && oldParam.name.escapedText === newParam.name.escapedText ? factory.createJSDocParameterTag(
                    /*tagName*/
                    void 0, newParam.name, 
                    /*isBracketed*/
                    false, newParam.typeExpression, newParam.isNameFirst, oldParam.comment) : void 0;
                }
                case 345 /* JSDocReturnTag */:
                    return factory.createJSDocReturnTag(
                    /*tagName*/
                    void 0, newTag.typeExpression, oldTag.comment);
                case 347 /* JSDocTypeTag */:
                    return factory.createJSDocTypeTag(
                    /*tagName*/
                    void 0, newTag.typeExpression, oldTag.comment);
            }
        }