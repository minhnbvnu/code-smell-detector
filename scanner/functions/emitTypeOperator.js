function emitTypeOperator(node) {
                writeTokenText(node.operator, writeKeyword);
                writeSpace();
                const parenthesizerRule = node.operator === 146 /* ReadonlyKeyword */ ? parenthesizer.parenthesizeOperandOfReadonlyTypeOperator : parenthesizer.parenthesizeOperandOfTypeOperator;
                emit(node.type, parenthesizerRule);
            }