function getSourceFileLike(fileName) {
                return !host.getSourceFileLike ? getSourceFile(fileName) || getOrCreateSourceFileLike(fileName) : host.getSourceFileLike(fileName);
            }