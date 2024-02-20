function listEmittedFile({ write }, proj, file) {
            if (write && proj.options.listEmittedFiles) {
                write(`TSFILE: ${file}`);
            }
        }