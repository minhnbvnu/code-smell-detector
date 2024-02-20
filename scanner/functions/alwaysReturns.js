function alwaysReturns(node) {
                if (node.type === "BlockStatement") {
                    // If we have a BlockStatement, check each consequent body node.
                    return node.body.some(checkForReturnOrIf);
                }
                /*
                 * If not a block statement, make sure the consequent isn't a
                 * ReturnStatement or an IfStatement with returns on both paths.
                 */
                return checkForReturnOrIf(node);
            }