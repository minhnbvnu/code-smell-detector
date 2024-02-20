function deriveAnchor(edge, index, ep, conn) {
            return options.anchor ? options.anchor : options.deriveAnchor(edge, index, ep, conn);
        }