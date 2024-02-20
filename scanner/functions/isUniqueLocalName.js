function isUniqueLocalName(name, container) {
                for (let node = container; node && isNodeDescendantOf(node, container); node = node.nextContainer) {
                    if (canHaveLocals(node) && node.locals) {
                        const local = node.locals.get(escapeLeadingUnderscores(name));
                        if (local && local.flags & (111551 /* Value */ | 1048576 /* ExportValue */ | 2097152 /* Alias */)) {
                            return false;
                        }
                    }
                }
                return true;
            }