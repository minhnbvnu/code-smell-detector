function checkAddGitignoreFile() {
                if(!fs.existsSync(mongodbIgnoreFilePath)) {
                    return true;
                }

                var content = fs.readFileSync(mongodbIgnoreFilePath,'utf-8');
                mongondbRegEx = /([\n\r]+|^)+mongodb([\n\r]+|$)/;
                isNotFind = -1 == content.search(mongondbRegEx);

                return isNotFind ;
            }