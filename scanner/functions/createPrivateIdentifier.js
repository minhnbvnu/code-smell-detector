function createPrivateIdentifier(text) {
                if (!startsWith(text, "#"))
                    Debug.fail("First character of private identifier must be #: " + text);
                return createBasePrivateIdentifier(escapeLeadingUnderscores(text));
            }