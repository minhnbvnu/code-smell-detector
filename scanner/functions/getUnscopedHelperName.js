function getUnscopedHelperName(name) {
                return setEmitFlags(factory2.createIdentifier(name), 8192 /* HelperName */ | 4 /* AdviseOnEmitNode */);
            }