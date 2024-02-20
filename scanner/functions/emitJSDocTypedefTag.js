function emitJSDocTypedefTag(tag) {
                emitJSDocTagName(tag.tagName);
                if (tag.typeExpression) {
                    if (tag.typeExpression.kind === 312 /* JSDocTypeExpression */) {
                        emitJSDocTypeExpression(tag.typeExpression);
                    }
                    else {
                        writeSpace();
                        writePunctuation("{");
                        write("Object");
                        if (tag.typeExpression.isArrayType) {
                            writePunctuation("[");
                            writePunctuation("]");
                        }
                        writePunctuation("}");
                    }
                }
                if (tag.fullName) {
                    writeSpace();
                    emit(tag.fullName);
                }
                emitJSDocComment(tag.comment);
                if (tag.typeExpression && tag.typeExpression.kind === 325 /* JSDocTypeLiteral */) {
                    emitJSDocTypeLiteral(tag.typeExpression);
                }
            }