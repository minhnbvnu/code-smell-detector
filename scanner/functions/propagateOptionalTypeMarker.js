function propagateOptionalTypeMarker(type, node, wasOptional) {
                return wasOptional ? isOutermostOptionalChain(node) ? getOptionalType(type) : addOptionalTypeMarker(type) : type;
            }