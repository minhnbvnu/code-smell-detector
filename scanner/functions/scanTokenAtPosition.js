function scanTokenAtPosition(sourceFile, pos) {
            const scanner2 = createScanner(sourceFile.languageVersion, 
            /*skipTrivia*/
            true, sourceFile.languageVariant, sourceFile.text, 
            /*onError:*/
            void 0, pos);
            scanner2.scan();
            return scanner2.getToken();
        }