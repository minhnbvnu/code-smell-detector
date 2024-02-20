function maskModifierFlags(node, modifierMask = 258047 /* All */ ^ 4 /* Public */, modifierAdditions = 0 /* None */) {
            let flags = getEffectiveModifierFlags(node) & modifierMask | modifierAdditions;
            if (flags & 1024 /* Default */ && !(flags & 1 /* Export */)) {
                flags ^= 1 /* Export */;
            }
            if (flags & 1024 /* Default */ && flags & 2 /* Ambient */) {
                flags ^= 2 /* Ambient */;
            }
            return flags;
        }