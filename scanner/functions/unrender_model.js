function unrender_model(model) {
            const view = views.get(model);
            if (view != null) {
                view.remove();
                views.delete(view);
                delete exports.index[model.id];
            }
        }