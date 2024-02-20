function createUniquePrivateName(text, prefix, suffix) {
                if (text && !startsWith(text, "#"))
                    Debug.fail("First character of private identifier must be #: " + text);
                const autoGenerateFlags = 8 /* ReservedInNestedScopes */ | (text ? 3 /* Unique */ : 1 /* Auto */);
                return createBaseGeneratedPrivateIdentifier(text != null ? text : "", autoGenerateFlags, prefix, suffix);
            }