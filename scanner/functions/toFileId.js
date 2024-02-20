function toFileId(path) {
                let fileId = fileNameToFileId.get(path);
                if (fileId === void 0) {
                    fileNames.push(relativeToBuildInfo(path));
                    fileNameToFileId.set(path, fileId = fileNames.length);
                }
                return fileId;
            }