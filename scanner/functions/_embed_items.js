async function _embed_items(docs_json, render_items, app_path, absolute_url) {
        if ((0, types_1.isString)(docs_json))
            docs_json = JSON.parse((0, string_1.unescape)(docs_json));
        const docs = {};
        for (const [docid, doc_json] of (0, object_1.entries)(docs_json)) {
            docs[docid] = document_1.Document.from_json(doc_json);
        }
        const views = [];
        for (const item of render_items) {
            const element = (0, dom_1._resolve_element)(item);
            const roots = (0, dom_1._resolve_root_elements)(item);
            if (item.docid != null) {
                views.push(await (0, standalone_1.add_document_standalone)(docs[item.docid], element, roots, item.use_for_title));
            }
            else if (item.token != null) {
                const websocket_url = (0, server_1._get_ws_url)(app_path, absolute_url);
                logging_1.logger.debug(`embed: computed ws url: ${websocket_url}`);
                try {
                    views.push(await (0, server_1.add_document_from_session)(websocket_url, item.token, element, roots, item.use_for_title));
                    console.log("Bokeh items were rendered successfully");
                }
                catch (error) {
                    if (settings_1.settings.dev)
                        throw error;
                    else
                        console.error("Error rendering Bokeh items:", error);
                }
            }
            else
                throw new Error("Error rendering Bokeh items: either 'docid' or 'token' was expected.");
        }
        return views;
    }