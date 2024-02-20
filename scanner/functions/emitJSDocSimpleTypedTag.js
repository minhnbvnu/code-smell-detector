function emitJSDocSimpleTypedTag(tag) {
                emitJSDocTagName(tag.tagName);
                emitJSDocTypeExpression(tag.typeExpression);
                emitJSDocComment(tag.comment);
            }