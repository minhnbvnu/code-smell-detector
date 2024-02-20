function EmitOptions(settings) {
            this.ioHost = null;
            this.outputMany = true;
            this.commonDirectoryPath = "";
            this.minWhitespace = settings.minWhitespace;
            this.propagateConstants = settings.propagateConstants;
            this.emitComments = settings.emitComments;
            this.outputOption = settings.outputOption;
        }