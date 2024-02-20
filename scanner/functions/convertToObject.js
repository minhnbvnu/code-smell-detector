function convertToObject(sourceFile, errors) {
            var _a2;
            return convertToObjectWorker(sourceFile, (_a2 = sourceFile.statements[0]) == null ? void 0 : _a2.expression, errors, 
            /*returnValue*/
            true, 
            /*knownRootOptions*/
            void 0, 
            /*jsonConversionNotifier*/
            void 0);
        }