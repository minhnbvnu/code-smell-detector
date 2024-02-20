function prepareResolving(response) {
        EDD._deps = JSON.parse(this.responseText);
        Object.keys(EDD._deps.files).forEach(function (file) {
            resolveDependencies(file);
        });
    }