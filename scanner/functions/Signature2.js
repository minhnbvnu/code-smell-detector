function Signature2(checker, flags) {
            this.flags = flags;
            if (Debug.isDebugging) {
                this.checker = checker;
            }
        }