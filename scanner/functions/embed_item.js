async function embed_item(item, target) {
        const docs_json = {};
        const doc_id = (0, string_1.uuid4)();
        docs_json[doc_id] = item.doc;
        if (target == null)
            target = item.target_id;
        const roots = { [item.root_id]: target };
        const render_item = { roots, root_ids: [item.root_id], docid: doc_id };
        await (0, defer_1.defer)();
        const [views] = await _embed_items(docs_json, [render_item]);
        return views;
    }