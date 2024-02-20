function getGeneratedPrivateNameForNode(node, prefix, suffix) {
                const text = isMemberName(node) ? formatGeneratedName(
                /*privateName*/
                true, prefix, node, suffix, idText) : `#generated@${getNodeId(node)}`;
                const flags2 = prefix || suffix ? 16 /* Optimistic */ : 0 /* None */;
                const name = createBaseGeneratedPrivateIdentifier(text, 4 /* Node */ | flags2, prefix, suffix);
                name.original = node;
                return name;
            }