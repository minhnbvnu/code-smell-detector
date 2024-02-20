function emitJSDocTemplateTag(tag) {
                emitJSDocTagName(tag.tagName);
                emitJSDocTypeExpression(tag.constraint);
                writeSpace();
                emitList(tag, tag.typeParameters, 528 /* CommaListElements */);
                emitJSDocComment(tag.comment);
            }