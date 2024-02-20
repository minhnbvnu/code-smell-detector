async function add_document_from_session(websocket_url, token, element, roots = [], use_for_title = false) {
        const args_string = window.location.search.substring(1);
        let session;
        try {
            session = await _get_session(websocket_url, token, args_string);
        }
        catch (error) {
            const session_id = (0, connection_1.parse_token)(token).session_id;
            logging_1.logger.error(`Failed to load Bokeh session ${session_id}: ${error}`);
            throw error;
        }
        return (0, standalone_1.add_document_standalone)(session.document, element, roots, use_for_title);
    }