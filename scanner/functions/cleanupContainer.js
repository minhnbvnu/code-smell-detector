function cleanupContainer(container, options) {
    if (options.removeContainer) {
        container.parentNode.removeChild(container);
        log("Cleaned up container");
    }
}