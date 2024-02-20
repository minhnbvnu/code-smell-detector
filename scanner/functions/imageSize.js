function imageSize(functionContext, filePathNode) {
            var filePath = filePathNode.value;
            var currentFileInfo = functionContext.currentFileInfo;
            var currentDirectory = currentFileInfo.rewriteUrls ?
                currentFileInfo.currentDirectory : currentFileInfo.entryPath;
            var fragmentStart = filePath.indexOf('#');
            if (fragmentStart !== -1) {
                filePath = filePath.slice(0, fragmentStart);
            }
            var fileManager = environment.getFileManager(filePath, currentDirectory, functionContext.context, environment, true);
            if (!fileManager) {
                throw {
                    type: 'File',
                    message: "Can not set up FileManager for " + filePathNode
                };
            }
            var fileSync = fileManager.loadFileSync(filePath, currentDirectory, functionContext.context, environment);
            if (fileSync.error) {
                throw fileSync.error;
            }
            var sizeOf = require(199) /* image-size */;
            return sizeOf(fileSync.filename);
        }