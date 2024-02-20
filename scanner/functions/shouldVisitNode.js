function shouldVisitNode(node) {
                return (node.transformFlags & 1024 /* ContainsES2015 */) !== 0 || convertedLoopState !== void 0 || hierarchyFacts & 8192 /* ConstructorWithCapturedSuper */ && isOrMayContainReturnCompletion(node) || isIterationStatement(node, 
                /*lookInLabeledStatements*/
                false) && shouldConvertIterationStatement(node) || (getInternalEmitFlags(node) & 1 /* TypeScriptClassWrapper */) !== 0;
            }