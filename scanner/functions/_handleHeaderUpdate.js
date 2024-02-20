function _handleHeaderUpdate(request, sender, sendResponse) {
        // if this is not a header update don't do anything
        if (request.name != "header_update") {
            return;
        }

        if (use_queue) {
            queue.push(request.details);
            return sendResponse("done");
        }

        _process(request.details);
        return sendResponse("done");
    }