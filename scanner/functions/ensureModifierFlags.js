function ensureModifierFlags(node) {
                let mask2 = 258047 /* All */ ^ (4 /* Public */ | 512 /* Async */ | 16384 /* Override */);
                let additions = needsDeclare && !isAlwaysType(node) ? 2 /* Ambient */ : 0 /* None */;
                const parentIsFile = node.parent.kind === 308 /* SourceFile */;
                if (!parentIsFile || isBundledEmit && parentIsFile && isExternalModule(node.parent)) {
                    mask2 ^= 2 /* Ambient */;
                    additions = 0 /* None */;
                }
                return maskModifierFlags(node, mask2, additions);
            }