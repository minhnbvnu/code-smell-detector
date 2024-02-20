function loadDepsFile() {
        var depsFilePath = EDD._path ? EDD._path + '/' + EDD._depsFile : EDD._depsFile;
        var xhrObj = new XMLHttpRequest();
        xhrObj.addEventListener("load", prepareResolving);
        xhrObj.open('GET', depsFilePath);
        xhrObj.send();
    }