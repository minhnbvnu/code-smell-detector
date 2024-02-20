function inferrablePropertyVisitor(node) {
                // We ignore `readonly` because of Microsoft/TypeScript#14416
                // Essentially a readonly property without a type
                // will result in its value being the type, leading to
                // compile errors if the type is stripped.
                if (ignoreProperties || node.readonly || node.optional) {
                    return;
                }
                reportInferrableType(node, node.typeAnnotation, node.value);
            }