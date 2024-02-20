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