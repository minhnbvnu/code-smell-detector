function setSourceContent(sourceIndex, content) {
                enter();
                if (content !== null) {
                    if (!sourcesContent)
                        sourcesContent = [];
                    while (sourcesContent.length < sourceIndex) {
                        sourcesContent.push(null);
                    }
                    sourcesContent[sourceIndex] = content;
                }
                exit();
            }