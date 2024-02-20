async function _build_view(view_cls, model, options) {
        (0, assert_1.assert)(view_cls != null, "model doesn't implement a view");
        const view = new view_cls(Object.assign(Object.assign({}, options), { model }));
        view.initialize();
        await view.lazy_initialize();
        return view;
    }