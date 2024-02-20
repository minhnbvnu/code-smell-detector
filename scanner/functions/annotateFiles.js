function annotateFiles(files, errors) {
            errors.forEach(function (error) {
                var file = files[error.file];
                if (file) {
                    var line = file.index[error.line];
                    if (line) {
                        line.errors.push(error);
                        file.hasErrors = true;
                        return;
                    }
                }
                files.unknown.hasErrors = true;
                files.unknown.lines[0].errors.push(error);
            });
        }