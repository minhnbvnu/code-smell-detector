async function render_model(model) {
            if (model.default_view != null)
                await render_view(model);
            else
                document.notify_idle(model);
        }