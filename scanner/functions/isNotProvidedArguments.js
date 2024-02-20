function isNotProvidedArguments(parameter, checker, sourceFiles) {
            const index = parameter.parent.parameters.indexOf(parameter);
            return !ts_FindAllReferences_exports.Core.someSignatureUsage(parameter.parent, sourceFiles, checker, (_, call) => !call || call.arguments.length > index);
        }