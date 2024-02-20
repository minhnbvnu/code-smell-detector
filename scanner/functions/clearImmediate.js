function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }