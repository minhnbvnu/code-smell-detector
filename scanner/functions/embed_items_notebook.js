function embed_items_notebook(docs_json, render_items) {
        if ((0, object_1.size)(docs_json) != 1)
            throw new Error("embed_items_notebook expects exactly one document in docs_json");
        const document = document_1.Document.from_json((0, object_1.values)(docs_json)[0]);
        for (const item of render_items) {
            if (item.notebook_comms_target != null)
                _init_comms(item.notebook_comms_target, document);
            const element = (0, dom_1._resolve_element)(item);
            const roots = (0, dom_1._resolve_root_elements)(item);
            (0, standalone_1.add_document_standalone)(document, element, roots);
            for (const root of roots) {
                if (root instanceof HTMLElement) {
                    root.removeAttribute("id");
                }
            }
        }
    }