function emitJSDocHeritageTag(tag) {
                emitJSDocTagName(tag.tagName);
                writeSpace();
                writePunctuation("{");
                emit(tag.class);
                writePunctuation("}");
                emitJSDocComment(tag.comment);
            }