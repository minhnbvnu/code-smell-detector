function getNamespaceMemberName(ns, name, allowComments, allowSourceMaps) {
                const qualifiedName = createPropertyAccessExpression(ns, nodeIsSynthesized(name) ? name : cloneNode(name));
                setTextRange(qualifiedName, name);
                let emitFlags = 0;
                if (!allowSourceMaps)
                    emitFlags |= 96 /* NoSourceMap */;
                if (!allowComments)
                    emitFlags |= 3072 /* NoComments */;
                if (emitFlags)
                    setEmitFlags(qualifiedName, emitFlags);
                return qualifiedName;
            }