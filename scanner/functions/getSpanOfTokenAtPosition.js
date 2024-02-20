function getSpanOfTokenAtPosition(sourceFile, pos) {
            const scanner2 = createScanner(sourceFile.languageVersion, 
            /*skipTrivia*/
            true, sourceFile.languageVariant, sourceFile.text, 
            /*onError:*/
            void 0, pos);
            scanner2.scan();
            const start = scanner2.getTokenPos();
            return createTextSpanFromBounds(start, scanner2.getTextPos());
        }