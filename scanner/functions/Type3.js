function Type3(checker, flags) {
            this.flags = flags;
            if (Debug.isDebugging || tracing) {
                this.checker = checker;
            }
        }