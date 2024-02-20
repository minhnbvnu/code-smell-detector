function recordPotentialCollisionWithWeakMapSetInGeneratedCode(node, name) {
                if (languageVersion <= 8 /* ES2021 */ && (needCollisionCheckForIdentifier(node, name, "WeakMap") || needCollisionCheckForIdentifier(node, name, "WeakSet"))) {
                    potentialWeakMapSetCollisions.push(node);
                }
            }