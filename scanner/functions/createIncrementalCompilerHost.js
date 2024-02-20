function createIncrementalCompilerHost(options, system = sys) {
            const host = createCompilerHostWorker(options, 
            /*setParentNodes*/
            void 0, system);
            host.createHash = maybeBind(system, system.createHash);
            host.storeFilesChangingSignatureDuringEmit = system.storeFilesChangingSignatureDuringEmit;
            setGetSourceFileAsHashVersioned(host);
            changeCompilerHostLikeToUseCache(host, (fileName) => toPath(fileName, host.getCurrentDirectory(), host.getCanonicalFileName));
            return host;
        }