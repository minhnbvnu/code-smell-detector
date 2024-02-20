function compute_renderers(renderers, all_renderers) {
        return renderers == "auto" ? all_renderers : renderers !== null && renderers !== void 0 ? renderers : [];
    }