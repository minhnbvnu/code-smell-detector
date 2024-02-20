function collectVariableUsage(sourceFile) {
        return new UsageWalker().getUsage(sourceFile);
    }