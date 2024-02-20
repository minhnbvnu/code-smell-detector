function createInputFiles(javascriptTextOrReadFileText, declarationTextOrJavascriptPath, javascriptMapPath, javascriptMapTextOrDeclarationPath, declarationMapPath, declarationMapTextOrBuildInfoPath) {
            return !isString(javascriptTextOrReadFileText) ? createInputFilesWithFilePaths(javascriptTextOrReadFileText, declarationTextOrJavascriptPath, javascriptMapPath, javascriptMapTextOrDeclarationPath, declarationMapPath, declarationMapTextOrBuildInfoPath) : createInputFilesWithFileTexts(
            /*javascriptPath*/
            void 0, javascriptTextOrReadFileText, javascriptMapPath, javascriptMapTextOrDeclarationPath, 
            /*declarationPath*/
            void 0, declarationTextOrJavascriptPath, declarationMapPath, declarationMapTextOrBuildInfoPath);
        }