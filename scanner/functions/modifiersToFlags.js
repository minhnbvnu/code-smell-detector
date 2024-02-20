function modifiersToFlags(modifiers) {
            let flags = 0 /* None */;
            if (modifiers) {
                for (const modifier of modifiers) {
                    flags |= modifierToFlag(modifier.kind);
                }
            }
            return flags;
        }