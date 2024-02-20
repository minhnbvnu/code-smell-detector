function emitJSDocSeeTag(tag) {
                emitJSDocTagName(tag.tagName);
                emit(tag.name);
                emitJSDocComment(tag.comment);
            }