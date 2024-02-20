function buildComponentContext(context, viewSpec, view) {
        return context.extend(viewSpec.options, view);
    }