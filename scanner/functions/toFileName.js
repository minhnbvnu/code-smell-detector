function toFileName(file, fileNameConvertor) {
            const fileName = isString(file) ? file : file.fileName;
            return fileNameConvertor ? fileNameConvertor(fileName) : fileName;
        }