function checkForClassificationCancellation(cancellationToken, kind) {
            switch (kind) {
                case 264 /* ModuleDeclaration */:
                case 260 /* ClassDeclaration */:
                case 261 /* InterfaceDeclaration */:
                case 259 /* FunctionDeclaration */:
                case 228 /* ClassExpression */:
                case 215 /* FunctionExpression */:
                case 216 /* ArrowFunction */:
                    cancellationToken.throwIfCancellationRequested();
            }
        }