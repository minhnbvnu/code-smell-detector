function IncrementalParser(logger) {
            this.logger = logger;
            this.astLogger = new TypeScript.AstLogger(this.logger);
        }