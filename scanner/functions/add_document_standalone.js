async function add_document_standalone(document, element, roots = [], use_for_title = false) {
        // this is a LOCAL index of views used only by this particular rendering
        // call, so we can remove the views we create.
        const views = new view_1.ViewManager();
        async function render_view(model) {
            var _a;
            const view = await (0, build_views_1.build_view)(model, { parent: null, owner: views });
            if (view instanceof dom_view_1.DOMView) {
                const i = document.roots().indexOf(model);
                const root_el = (_a = roots[i]) !== null && _a !== void 0 ? _a : element;
                view.render_to(root_el);
            }
            views.add(view);
            exports.index[model.id] = view;
        }
        async function render_model(model) {
            if (model.default_view != null)
                await render_view(model);
            else
                document.notify_idle(model);
        }
        function unrender_model(model) {
            const view = views.get(model);
            if (view != null) {
                view.remove();
                views.delete(view);
                delete exports.index[model.id];
            }
        }
        for (const model of document.roots())
            await render_model(model);
        if (use_for_title)
            window.document.title = document.title();
        document.on_change((event) => {
            if (event instanceof document_1.RootAddedEvent)
                render_model(event.model);
            else if (event instanceof document_1.RootRemovedEvent)
                unrender_model(event.model);
            else if (use_for_title && event instanceof document_1.TitleChangedEvent)
                window.document.title = event.title;
        });
        return views;
    }