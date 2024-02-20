function getNodeModifiers(node, excludeFlags = 0 /* None */) {
            const result = [];
            const flags = isDeclaration(node) ? getCombinedNodeFlagsAlwaysIncludeJSDoc(node) & ~excludeFlags : 0 /* None */;
            if (flags & 8 /* Private */)
                result.push("private" /* privateMemberModifier */);
            if (flags & 16 /* Protected */)
                result.push("protected" /* protectedMemberModifier */);
            if (flags & 4 /* Public */)
                result.push("public" /* publicMemberModifier */);
            if (flags & 32 /* Static */ || isClassStaticBlockDeclaration(node))
                result.push("static" /* staticModifier */);
            if (flags & 256 /* Abstract */)
                result.push("abstract" /* abstractModifier */);
            if (flags & 1 /* Export */)
                result.push("export" /* exportedModifier */);
            if (flags & 8192 /* Deprecated */)
                result.push("deprecated" /* deprecatedModifier */);
            if (node.flags & 16777216 /* Ambient */)
                result.push("declare" /* ambientModifier */);
            if (node.kind === 274 /* ExportAssignment */)
                result.push("export" /* exportedModifier */);
            return result.length > 0 ? result.join(",") : "" /* none */;
        }