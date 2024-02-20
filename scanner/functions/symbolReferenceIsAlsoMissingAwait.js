function symbolReferenceIsAlsoMissingAwait(reference, diagnostics, sourceFile, checker) {
            const errorNode = isPropertyAccessExpression(reference.parent) ? reference.parent.name : isBinaryExpression(reference.parent) ? reference.parent : reference;
            const diagnostic = find(diagnostics, (diagnostic2) => diagnostic2.start === errorNode.getStart(sourceFile) && diagnostic2.start + diagnostic2.length === errorNode.getEnd());
            return diagnostic && contains(errorCodes3, diagnostic.code) || // A Promise is usually not correct in a binary expression (it’s not valid
                // in an arithmetic expression and an equality comparison seems unusual),
                // but if the other side of the binary expression has an error, the side
                // is typed `any` which will squash the error that would identify this
                // Promise as an invalid operand. So if the whole binary expression is
                // typed `any` as a result, there is a strong likelihood that this Promise
                // is accidentally missing `await`.
                checker.getTypeAtLocation(errorNode).flags & 1 /* Any */;
        }