function createInputFilesWithFileTexts(javascriptPath, javascriptText, javascriptMapPath, javascriptMapText, declarationPath, declarationText, declarationMapPath, declarationMapText, buildInfoPath, buildInfo, oldFileOfCurrentEmit) {
            const node = parseNodeFactory.createInputFiles();
            node.javascriptPath = javascriptPath;
            node.javascriptText = javascriptText;
            node.javascriptMapPath = javascriptMapPath;
            node.javascriptMapText = javascriptMapText;
            node.declarationPath = declarationPath;
            node.declarationText = declarationText;
            node.declarationMapPath = declarationMapPath;
            node.declarationMapText = declarationMapText;
            node.buildInfoPath = buildInfoPath;
            node.buildInfo = buildInfo;
            node.oldFileOfCurrentEmit = oldFileOfCurrentEmit;
            return node;
        }