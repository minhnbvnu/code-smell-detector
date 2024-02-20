function emitJSDocOverloadTag(tag) {
                emitJSDocComment(tag.comment);
                emitJSDocSignature(tag.typeExpression);
            }