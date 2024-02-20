function normalizeReportLoc(descriptor) {
        if (descriptor.loc) {
            if (descriptor.loc.start) {
                return descriptor.loc;
            }
            return { start: descriptor.loc, end: null };
        }
        return descriptor.node.loc;
    }