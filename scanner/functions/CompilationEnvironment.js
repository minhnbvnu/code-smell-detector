function CompilationEnvironment(compilationSettings, ioHost) {
            this.compilationSettings = compilationSettings;
            this.ioHost = ioHost;
            this.residentCode = [];
            this.code = [];
        }