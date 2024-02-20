function emitJSDocTypeExpression(typeExpression) {
                if (typeExpression) {
                    writeSpace();
                    writePunctuation("{");
                    emit(typeExpression.type);
                    writePunctuation("}");
                }
            }