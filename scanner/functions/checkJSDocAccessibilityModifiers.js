function checkJSDocAccessibilityModifiers(node) {
                const host2 = getJSDocHost(node);
                if (host2 && isPrivateIdentifierClassElementDeclaration(host2)) {
                    error(node, Diagnostics.An_accessibility_modifier_cannot_be_used_with_a_private_identifier);
                }
            }