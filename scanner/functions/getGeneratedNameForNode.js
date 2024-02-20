function getGeneratedNameForNode(node, flags2 = 0, prefix, suffix) {
                Debug.assert(!(flags2 & 7 /* KindMask */), "Argument out of range: flags");
                const text = !node ? "" : isMemberName(node) ? formatGeneratedName(
                /*privateName*/
                false, prefix, node, suffix, idText) : `generated@${getNodeId(node)}`;
                if (prefix || suffix)
                    flags2 |= 16 /* Optimistic */;
                const name = createBaseGeneratedIdentifier(text, 4 /* Node */ | flags2, prefix, suffix);
                name.original = node;
                return name;
            }