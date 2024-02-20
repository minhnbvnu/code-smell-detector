function ContextualTypingContextStack(checker) {
            this.checker = checker;
            this.contextStack = [];
            this.hadProvisionalErrors = false;
        }