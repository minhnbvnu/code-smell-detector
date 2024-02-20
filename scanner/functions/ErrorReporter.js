function ErrorReporter(outfile) {
            this.outfile = outfile;
            this.parser = null;
            this.checker = null;
            this.lineCol = {
                line: 0,
                col: 0
            };
            this.emitAsComments = true;
            this.hasErrors = false;
            this.pushToErrorSink = false;
            this.errorSink = [];
        }