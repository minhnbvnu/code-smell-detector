function visitClassStaticBlockDeclaration(node) {
                enterClassElement(node);
                if (classInfo)
                    classInfo.hasStaticInitializers = true;
                const result = visitEachChild(node, visitor, context);
                exitClassElement();
                return result;
            }