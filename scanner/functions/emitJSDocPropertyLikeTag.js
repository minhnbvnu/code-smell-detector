function emitJSDocPropertyLikeTag(param) {
                emitJSDocTagName(param.tagName);
                emitJSDocTypeExpression(param.typeExpression);
                writeSpace();
                if (param.isBracketed) {
                    writePunctuation("[");
                }
                emit(param.name);
                if (param.isBracketed) {
                    writePunctuation("]");
                }
                emitJSDocComment(param.comment);
            }