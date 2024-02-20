function assertValidNodeInfo(descriptor) {
        if (descriptor.node) {
            assert(typeof descriptor.node === "object", "Node must be an object");
        }
        else {
            assert(descriptor.loc, "Node must be provided when reporting error if location is not provided");
        }
    }