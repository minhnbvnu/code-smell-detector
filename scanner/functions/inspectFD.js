function inspectFD(emitted) {
            const { node } = emitted,
                visibilityModifiers = ["public", "external", "internal", "private"];
            const modifiers = (node.modifiers || []),
                firstVisibilityModifierIndex = modifiers.findIndex(m => visibilityModifiers.includes(m.name));

            // If no visibility modifiers exist in function declaration, exit now
            if (emitted.exit || firstVisibilityModifierIndex === -1) {
                return;
            }

            const firstNonVisModifBeforeFirstVisModif = modifiers.slice(0, firstVisibilityModifierIndex).find(m => !visibilityModifiers.includes(m.name));

            // TODO: Add fix() for this rule
            if (firstNonVisModifBeforeFirstVisModif) {
                const issue = {
                    node: modifiers[firstVisibilityModifierIndex],
                    message: `Visibility modifier "${modifiers[firstVisibilityModifierIndex].name}" should come before other modifiers.`
                };
                context.report(issue);
            }
        }