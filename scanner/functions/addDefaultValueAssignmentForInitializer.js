function addDefaultValueAssignmentForInitializer(parameter, name, initializer, context) {
            const factory2 = context.factory;
            context.addInitializationStatement(factory2.createIfStatement(factory2.createTypeCheck(factory2.cloneNode(name), "undefined"), setEmitFlags(setTextRange(factory2.createBlock([
                factory2.createExpressionStatement(setEmitFlags(setTextRange(factory2.createAssignment(setEmitFlags(factory2.cloneNode(name), 96 /* NoSourceMap */), setEmitFlags(initializer, 96 /* NoSourceMap */ | getEmitFlags(initializer) | 3072 /* NoComments */)), parameter), 3072 /* NoComments */))
            ]), parameter), 1 /* SingleLine */ | 64 /* NoTrailingSourceMap */ | 768 /* NoTokenSourceMaps */ | 3072 /* NoComments */)));
            return factory2.updateParameterDeclaration(parameter, parameter.modifiers, parameter.dotDotDotToken, parameter.name, parameter.questionToken, parameter.type, 
            /*initializer*/
            void 0);
        }