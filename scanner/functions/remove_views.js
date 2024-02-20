function remove_views(view_storage) {
        for (const [model, view] of view_storage) {
            view.remove();
            view_storage.delete(model);
        }
    }