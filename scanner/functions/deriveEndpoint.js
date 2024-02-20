function deriveEndpoint(edge, index, ep, conn) {
            return options.deriveEndpoint ? options.deriveEndpoint(edge, index, ep, conn) : options.endpoint ? options.endpoint : ep.type;
        }