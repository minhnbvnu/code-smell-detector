function bindPropertyWorker(node) {
                const isAutoAccessor = isAutoAccessorPropertyDeclaration(node);
                const includes = isAutoAccessor ? 98304 /* Accessor */ : 4 /* Property */;
                const excludes = isAutoAccessor ? 13247 /* AccessorExcludes */ : 0 /* PropertyExcludes */;
                return bindPropertyOrMethodOrAccessor(node, includes | (node.questionToken ? 16777216 /* Optional */ : 0 /* None */), excludes);
            }