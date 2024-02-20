function typeToTypeNodeHelper(type, context) {
                    const savedFlags = context.flags;
                    const typeNode = typeToTypeNodeWorker(type, context);
                    context.flags = savedFlags;
                    return typeNode;
                }