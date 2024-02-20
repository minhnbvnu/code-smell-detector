function addPropertyOrClassStaticBlockStatements(statements, properties, receiver) {
                for (const property of properties) {
                    if (isStatic(property) && !shouldTransformPrivateElementsOrClassStaticBlocks) {
                        continue;
                    }
                    const statement = transformPropertyOrClassStaticBlock(property, receiver);
                    if (!statement) {
                        continue;
                    }
                    statements.push(statement);
                }
            }