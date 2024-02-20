function getRootFilePath(outFname) {
        if(outFname == "") {
            return outFname;
        } else {
            var isPath = outFname.indexOf("/") != -1;
            return isPath ? filePath(outFname) : "";
        }
    }