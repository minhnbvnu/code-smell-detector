function recordPotentialCollisionWithReflectInGeneratedCode(node, name) {
                if (name && languageVersion >= 2 /* ES2015 */ && languageVersion <= 8 /* ES2021 */ && needCollisionCheckForIdentifier(node, name, "Reflect")) {
                    potentialReflectCollisions.push(node);
                }
            }