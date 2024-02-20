function emitConditionalType(node) {
                emit(node.checkType, parenthesizer.parenthesizeCheckTypeOfConditionalType);
                writeSpace();
                writeKeyword("extends");
                writeSpace();
                emit(node.extendsType, parenthesizer.parenthesizeExtendsTypeOfConditionalType);
                writeSpace();
                writePunctuation("?");
                writeSpace();
                emit(node.trueType);
                writeSpace();
                writePunctuation(":");
                writeSpace();
                emit(node.falseType);
            }