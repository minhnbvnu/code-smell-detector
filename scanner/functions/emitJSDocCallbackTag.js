function emitJSDocCallbackTag(tag) {
                emitJSDocTagName(tag.tagName);
                if (tag.name) {
                    writeSpace();
                    emit(tag.name);
                }
                emitJSDocComment(tag.comment);
                emitJSDocSignature(tag.typeExpression);
            }