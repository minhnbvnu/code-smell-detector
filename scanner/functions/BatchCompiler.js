function BatchCompiler(ioHost) {
        this.ioHost = ioHost;
        this.resolvedEnvironment = null;
        this.hasResolveErrors = false;
        this.compilerVersion = "0.8.2.0";
        this.printedVersion = false;
        this.compilationSettings = new TypeScript.CompilationSettings();
        this.compilationEnvironment = new TypeScript.CompilationEnvironment(this.compilationSettings, this.ioHost);
    }