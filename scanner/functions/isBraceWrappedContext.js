function isBraceWrappedContext(context) {
            return context.contextNode.kind === 203 /* ObjectBindingPattern */ || context.contextNode.kind === 197 /* MappedType */ || isSingleLineBlockContext(context);
        }