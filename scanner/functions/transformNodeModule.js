function transformNodeModule(context) {
            const previousOnSubstituteNode = context.onSubstituteNode;
            const previousOnEmitNode = context.onEmitNode;
            const esmTransform = transformECMAScriptModule(context);
            const esmOnSubstituteNode = context.onSubstituteNode;
            const esmOnEmitNode = context.onEmitNode;
            context.onSubstituteNode = previousOnSubstituteNode;
            context.onEmitNode = previousOnEmitNode;
            const cjsTransform = transformModule(context);
            const cjsOnSubstituteNode = context.onSubstituteNode;
            const cjsOnEmitNode = context.onEmitNode;
            context.onSubstituteNode = onSubstituteNode;
            context.onEmitNode = onEmitNode;
            context.enableSubstitution(308 /* SourceFile */);
            context.enableEmitNotification(308 /* SourceFile */);
            let currentSourceFile;
            return transformSourceFileOrBundle;
            function onSubstituteNode(hint, node) {
                if (isSourceFile(node)) {
                    currentSourceFile = node;
                    return previousOnSubstituteNode(hint, node);
                }
                else {
                    if (!currentSourceFile) {
                        return previousOnSubstituteNode(hint, node);
                    }
                    if (currentSourceFile.impliedNodeFormat === 99 /* ESNext */) {
                        return esmOnSubstituteNode(hint, node);
                    }
                    return cjsOnSubstituteNode(hint, node);
                }
            }
            function onEmitNode(hint, node, emitCallback) {
                if (isSourceFile(node)) {
                    currentSourceFile = node;
                }
                if (!currentSourceFile) {
                    return previousOnEmitNode(hint, node, emitCallback);
                }
                if (currentSourceFile.impliedNodeFormat === 99 /* ESNext */) {
                    return esmOnEmitNode(hint, node, emitCallback);
                }
                return cjsOnEmitNode(hint, node, emitCallback);
            }
            function getModuleTransformForFile(file) {
                return file.impliedNodeFormat === 99 /* ESNext */ ? esmTransform : cjsTransform;
            }
            function transformSourceFile(node) {
                if (node.isDeclarationFile) {
                    return node;
                }
                currentSourceFile = node;
                const result = getModuleTransformForFile(node)(node);
                currentSourceFile = void 0;
                Debug.assert(isSourceFile(result));
                return result;
            }
            function transformSourceFileOrBundle(node) {
                return node.kind === 308 /* SourceFile */ ? transformSourceFile(node) : transformBundle(node);
            }
            function transformBundle(node) {
                return context.factory.createBundle(map(node.sourceFiles, transformSourceFile), node.prepends);
            }
        }