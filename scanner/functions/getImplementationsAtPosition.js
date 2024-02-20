function getImplementationsAtPosition(program, cancellationToken, sourceFiles, sourceFile, position) {
            const node = getTouchingPropertyName(sourceFile, position);
            let referenceEntries;
            const entries = getImplementationReferenceEntries(program, cancellationToken, sourceFiles, node, position);
            if (node.parent.kind === 208 /* PropertyAccessExpression */ || node.parent.kind === 205 /* BindingElement */ || node.parent.kind === 209 /* ElementAccessExpression */ || node.kind === 106 /* SuperKeyword */) {
                referenceEntries = entries && [...entries];
            }
            else if (entries) {
                const queue = createQueue(entries);
                const seenNodes = /* @__PURE__ */ new Map();
                while (!queue.isEmpty()) {
                    const entry = queue.dequeue();
                    if (!addToSeen(seenNodes, getNodeId(entry.node))) {
                        continue;
                    }
                    referenceEntries = append(referenceEntries, entry);
                    const entries2 = getImplementationReferenceEntries(program, cancellationToken, sourceFiles, entry.node, entry.node.pos);
                    if (entries2) {
                        queue.enqueue(...entries2);
                    }
                }
            }
            const checker = program.getTypeChecker();
            return map(referenceEntries, (entry) => toImplementationLocation(entry, checker));
        }