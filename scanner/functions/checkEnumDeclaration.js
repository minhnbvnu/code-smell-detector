function checkEnumDeclaration(node) {
                addLazyDiagnostic(() => checkEnumDeclarationWorker(node));
            }