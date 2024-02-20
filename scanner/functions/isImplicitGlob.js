function isImplicitGlob(lastPathComponent) {
            return !/[.*?]/.test(lastPathComponent);
        }