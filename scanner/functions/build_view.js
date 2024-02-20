async function build_view(model, options = { parent: null }, cls = (model) => model.default_view) {
        const view = await _build_view(cls(model), model, options);
        view.connect_signals();
        return view;
    }